import * as fs from 'fs'
import * as path from 'path'

export class AuthHelper{
    static tokenFilePath = path.join(__dirname,'../.auth/token.json')

    static getToken():string{
        const token = JSON.parse(fs.readFileSync(this.tokenFilePath,'utf-8'))
        return token.bearerToken
    }

    static getAuthHeader(): { Authorization: string } {
        const token = this.getToken()
        return { Authorization: `Bearer ${token}` }
      }
}