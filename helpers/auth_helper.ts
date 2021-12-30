import jwt from 'jsonwebtoken';

export const extract_token = (header:string) => {
    if(!header || !header.startsWith('Bearer')) throw new Error('Unauthorized');
    const token = header.split(' ')[1];
    if(!token) throw new Error('Authentication token not found');
    return token;
}

export const decode_token = (token:string) => {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    return payload;
}

export const encode_token = (payload:object) => {
    const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '1d'});
    return token
}