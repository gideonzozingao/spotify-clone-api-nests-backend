import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdConfigService {
  DBHOST = 'localhost';
  getDBHOST() {
    return this.DBHOST;
  }
}
