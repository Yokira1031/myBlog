import CryptoJS from 'crypto-js'

// 加密函数
function encryptAES(plaintext, key) {
    const encrypted = CryptoJS.AES.encrypt(plaintext, key);
    return encrypted.toString();
}

// 解密函数
function decryptAES(ciphertext, key) {
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// 测试加密和解密
const plaintext = 'Hello, World!';
const secretKey = '1234567890123456'; // 16字节的密钥

const ciphertext = encryptAES(plaintext, secretKey);
console.log('加密后的文本:', ciphertext);

const decryptedText = decryptAES(ciphertext, secretKey);
console.log('解密后的文本:', decryptedText);

const aes = {
    decryptAES,
    encryptAES
}

export default aes