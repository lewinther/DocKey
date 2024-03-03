export async function fetchUserProfile(){
    return Promise.resolve ([
        {
            Id: 0,
            Image: '',
            FirstName: '',
            LastName: '',
            PhoneNumber: '',
            Email: '',
            username: '',
        }
    ])
}

export async function fetchChatPartnerProfile(chatPartner) {
    return Promise.resolve ([
        {
            id: chatPartner,
            image: '',
            username: ''
        }
    ]);
}

export async function fetchPotentialChatPartners() {
    return Promise.resolve ([
        {
            username:'p1',
            userId:'user-A'
        },
        {
            username:'p2',
            userId:'user-B'
        },
        {
            username:'p3',
            userId:'user-C'
        }
    ])
}