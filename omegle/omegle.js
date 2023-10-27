
function generateRandomId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

class Omegle {
    
}