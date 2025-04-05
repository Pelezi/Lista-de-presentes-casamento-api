import { Gift } from "../entities/gift.entity";

import {
    GiftDTO,
    CreateGiftDTO,
    UpdateGiftDTO
} from "../../../../../dtos/GiftDTO";

import { BaseRepositoryImpl } from '../../../../../../base/BaseRepositoryImpl';

import { uploadFile, deleteFile, getObjectSignedUrl } from "../../../../../../../modules/utils/aws";

import crypto from 'crypto';
import sharp from 'sharp';
import { sendTelegramMessage } from "../../../../../../../config/telegram-bot-api";

const generateFileName = (bytes = 8) => crypto.randomBytes(bytes).toString('hex')
export class GiftRepositoryImpl
    extends BaseRepositoryImpl<GiftDTO, CreateGiftDTO, UpdateGiftDTO> {

    constructor() {
        super('id', Gift);
    }

    async formatCurrency(value: string): Promise<number> {
        return parseFloat(value.replace("R$ ", "").replace("R$ ", "").replace(".", "").replace(",", "."));
    };

    async createItem(createGiftDTO: CreateGiftDTO, photo?: Express.Multer.File, guestId?: string): Promise<GiftDTO> {
        const fileName = generateFileName();

        if (photo) {
            const fileBuffer = await sharp(photo.buffer)
                .resize({ height: 1080, width: 1080, fit: "contain" })
                .toBuffer()

            await uploadFile(fileBuffer, fileName, photo.mimetype);

        }

        createGiftDTO.value = await this.formatCurrency(String(createGiftDTO.value));

        const newGiftData = {
            ...createGiftDTO,
            fileName: photo ? fileName : null,
        }

        const gift = this.typeormRepository.create(newGiftData);
        await this.typeormRepository.save(gift);

        if (guestId) {
            const guest = await this.typeormRepository.manager.getRepository('Guest').findOne({ where: { id: guestId } });
            const chat = guest.phone === '81998625899' ? 2 : guest.phone === '81997250606' ? 1 : null;

            sendTelegramMessage('create', guest.name, newGiftData, chat);
        }
        return gift;
    }

    async updateItem(id: number, updateGiftDTO: UpdateGiftDTO, photo?: Express.Multer.File, guestId?: string): Promise<GiftDTO> {
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
            
            if (gift.fileName) {
                await deleteFile(gift.fileName);
            }

            gift.fileName = fileName;
        }

        updateGiftDTO.value = await this.formatCurrency(String(updateGiftDTO.value));
        
        Object.assign(gift, updateGiftDTO);
        await this.typeormRepository.update(id, gift);

        if (guestId) {
            const guest = await this.typeormRepository.manager.getRepository('Guest').findOne({ where: { id: guestId } });
            const chat = guest.phone === '81998625899' ? 2 : guest.phone === '81997250606' ? 1 : null;

            sendTelegramMessage('update', guest.name, gift, chat);
        }

        return await this.getItemById(id);
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
            .orderBy('gift.value', 'ASC')
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