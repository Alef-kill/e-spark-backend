import Users from '../../models/Users.cjs';
import { createToken } from '../../token/index.js';

async function store(req, res) {
    const {
        first_name,
        last_name,
        email,
        password,
    } = req.body;

    try {
        
        const user = await Users.findOrCreate({
            where: { email },
            defaults: {
                first_name,
                last_name,
                password
            }
        })

        if (user[1] === false) {
            return res.status(400).json({
                status: false,
                message: 'Não é possível criar um usuário com esse e-mail'
            })
        }

        return res.status(201).json({
            status: true,
            user
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Ocorreu um erro interno',
            error
        });
    }
}

async function index(req, res) {
    const user = await Users.findAll();
    return res.status(201).json({
        status: true,
        user
    })
}

async function update(req, res) {

    const { id } = req.params;

    const {
        first_name,
        last_name,
        email,
        password } = req.body;

    const user = await Users.update({ first_name, last_name, email, password }, {
        where: {
            id,
        }
    });

    return res.status(200).json({
        status: true,
        user
    })
}

async function destroy(req, res) {
    const { id } = req.params;

    const user = await Users.destroy({
        where: {
            id
        }
    });

    return res.status(202).json({
        user
    })

}

async function login(req, res) {
    var { email, password } = req.body;

    const user = await Users.findOne({
        where: {
            email,
            password
        }
    });

    if (user === null) {
        return res.status(400).json({
            status: false,
            message: 'ERROR - nenhum usuário encontrado'
        })
    };

    var { email, id, first_name, last_name } = user;

    const token = createToken({ id, email, first_name, last_name });

    return res.status(200).json({
        status: true,
        message: 'SUCCESS - Usuário encontrado',
        data: token
    });
}

export { store, index, update, destroy, login };