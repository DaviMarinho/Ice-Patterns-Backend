import { Repository } from './repository/port/user-repository'
import  UserRepository from './repository/user/repository'

export async function energy() {
    console.log('Verificando energias...');

    const userRepository = new UserRepository()

    const users = await userRepository.listAll()
    if (!users || users.length == 0) {
        console.log('erro ao listar todos os usuários ou usuários inexistentes')
        return
    }

    users.forEach(async user => {
        if (user.qtEnergy < 5) {
            const newEnergy = user.qtEnergy + 1
            const cubes = user.qtCube
            const boosters = user.qtBooster
            const updatedUser = await userRepository.updateUserItemQuantity(user.username, cubes, newEnergy, boosters)
            if (!updatedUser || updatedUser.affected != 1) {
                console.log(`erro ao atualizar energia do usuário ${user.username}`)
                return
            }
            // console.log(`1 energia dada ao usuário ${user.username}`)
            return
        }
        // console.log(`energia cheia usuário ${user.username}`)

    });

};