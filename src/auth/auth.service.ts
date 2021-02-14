import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService){

    }
    
    async validateUserByPassword(loginAttempt: LoginUserDto): Promise<any> {
        let userToAttempt: any = await this.usersService.findOneByEmail(loginAttempt.email);

        return new Promise((resolve) => {
            if (!userToAttempt) {
                resolve({success: false, msg: 'User not found'});
            }
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
                if(err) resolve({success: false, msg: 'Unexpected error. Please try again later.'});
    
               if(isMatch){
                    // If there is a successful match, generate a JWT for the user
                    resolve(this.createJwtPayload(userToAttempt))
               }
               else {
                    resolve({success: false, msg: 'Wrong password'})
                }
            });
        });
    }

    async validateUserByJwt(payload: JwtPayload) { 

        // This will be used when the user has already logged in and has a JWT
        let user = await this.usersService.findOneByEmail(payload.email);

        if(user){
            return this.createJwtPayload(user);
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(user){

        let data: JwtPayload = {
            email: user.email
        };

        let jwt = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt            
        }

    }

}
