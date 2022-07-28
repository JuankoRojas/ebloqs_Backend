import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hey Dude! :) See route /docs for more info abaut this API';
    }
}
