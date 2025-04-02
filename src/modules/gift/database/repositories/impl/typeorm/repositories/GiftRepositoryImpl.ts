import { Gift } from "../entities/gift.entity";

import {
    GiftDTO,
    CreateGiftDTO,
    UpdateGiftDTO
} from "../../../../../dtos/GiftDTO";

import { BaseRepositoryImpl } from '../../../../../../base/BaseRepositoryImpl';

import { uploadFile, deleteFile, getObjectSignedUrl } from "modules/utils/aws";

import crypto from 'crypto';
import sharp from 'sharp';
import { sendTelegramMessage } from "config/telegram-bot-api";

const generateFileName = (bytes = 8) => crypto.randomBytes(bytes).toString('hex')
export class GiftRepositoryImpl
    extends BaseRepositoryImpl<GiftDTO, CreateGiftDTO, UpdateGiftDTO> {

    constructor() {
        super('id', Gift);
    }


    async createItem(createGiftDTO: CreateGiftDTO, photo?: Express.Multer.File): Promise<GiftDTO> {
        const fileName = generateFileName();

        const fileBuffer = await sharp(photo.buffer)
            .resize({ height: 1080, width: 1080, fit: "contain" })
            .toBuffer()
        
        await uploadFile(fileBuffer, fileName, photo.mimetype);

        const newGiftData = {
            ...createGiftDTO,
            fileName: fileName,
        }

        const gift = this.typeormRepository.create(newGiftData);
        await this.typeormRepository.save(gift);
        return gift;
    }

    async updateItem(id: number, updateGiftDTO: UpdateGiftDTO, photo?: Express.Multer.File): Promise<GiftDTO> {
        const gift = await this.getItemById(id);
        if (!gift) {
            throw new Error(`Registro não encontrado!`);
        }

        if (photo) {
            const fileName = generateFileName();

            const fileBuffer = await sharp(photo.buffer)
                .resize({ height: 1080, width: 1080, fit: "contain" })
                .toBuffer()
            
            await uploadFile(fileBuffer, fileName, photo.mimetype);

            await deleteFile(gift.fileName);
            gift.fileName = fileName;
        }

        Object.assign(gift, updateGiftDTO);
        await this.typeormRepository.save(gift);
        return gift;
    }

    async getAllInfo(giftId: string): Promise<GiftDTO> {
        const gift = await this.typeormRepository.createQueryBuilder('gift')
            .select([
                'gift.id',
                'gift.name',
                'gift.fileName',
                'gift.value',
                'gift.mpcode',
            ])
            .where('gift.id = :giftId', { giftId })
            .getOne();

        if (!gift) {
            throw new Error(`Registro não encontrado!`);
        }

        return gift;
    }

    async getItems(): Promise<GiftDTO[]> {
        const gifts = await this.typeormRepository.createQueryBuilder('gift')
            .select([
                'gift.id',
                'gift.name',
                'gift.fileName',
                'gift.value',
                'gift.mpcode',
            ])
            .groupBy('gift.id')
            .getRawMany();

        if (!gifts) {
            throw new Error(`Registro não encontrado!`);
        }

        return gifts.map(gift => ({
            id: gift.gift_id,
            name: gift.gift_name,
            fileName: gift.gift_file_name,
            value: gift.gift_value,
            mpcode: gift.gift_mpcode,
        }));
    }

    
    async telegramMessage(type: string, guest: string, gift?: string): Promise<void> {
        const giftInfo = await this.getAllInfo(gift);
        sendTelegramMessage(type, guest, giftInfo);
    }

}