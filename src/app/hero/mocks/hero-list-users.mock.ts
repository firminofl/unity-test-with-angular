import { IHeroListUserResponseDto } from "../dtos/hero-list-users.dto";

export const mockHeroListUserResponseDto: IHeroListUserResponseDto[] = [
    {
        id: 1,
        name: 'Teste',
        email: 'teste@teste.com',
        website: 'www.teste.com.br',
        username: 'teste',
        address: {
            city: 'Teste',
            street: 'Teste',
            zipcode: '123',
            suite: '',
            geo: {
                lat: '12.00',
                lng: '14.00'
            }
        },
        company: {
            bs: '',
            catchPhrase: '',
            name: ''
        },
        phone: '1234'
    },
    {
        id: 2,
        name: 'Teste 2',
        email: 'teste2@teste2.com',
        website: 'www.teste2.com.br',
        username: 'teste 2',
        address: {
            city: 'Teste 2',
            street: 'Teste 2',
            zipcode: '12334',
            suite: '',
            geo: {
                lat: '12.22',
                lng: '14.123'
            }
        },
        company: {
            bs: '',
            catchPhrase: '',
            name: ''
        },
        phone: '123456'
    }
]