import { error } from 'console'
import * as fs from 'fs'
import * as path from 'path'

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

export class AuthHelper{
    static tokenFilePath = path.join(__dirname,'../.auth/token.json')

    static getToken():string{
        if (isGitHubActions) {
            const token = process.env.API_TOKEN
            if (!token) {
                throw new Error('GitHub Secret API_TOKEN not found');
              }
              return token
            }
        if(fs.existsSync(this.tokenFilePath)){
            const token = JSON.parse(fs.readFileSync(this.tokenFilePath,'utf-8'))
            return token.bearerToken
        }
        else{
             throw new error('Local token.json file not found')
        }
    }

    static getAuthHeader(): { Authorization: string } {
        const token = this.getToken()
        return { Authorization: `Bearer ${token}` }
      }
}