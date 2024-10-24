const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x8E67154c0566e09422B226d190C073bBd0737046"; 
    const UserRegistry = await ethers.getContractFactory("UserRegistry");
    const userRegistry = UserRegistry.attach(contractAddress);

    // Parámetros para la prueba
    const name = "Juan";
    const surname = "Pérez";
    const country = "Costa Rica";
    const city = "San José";
    const nationality = "Costarricense";
    const birthdate = 1234567890; 
    const email = "juan.perez@example.com"; 
    const passwordHash = "0x2748f3f7d035b771b3f93283c2b26bb177f7e6fd7a9f6bcd1f363909b2d5b952"; 
    const phone = "12345678";
    const walletAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; 

    try {
        const tx = await userRegistry.registerUser(
            name,
            surname,
            country,
            city,
            nationality,
            birthdate,
            email,
            phone,
            "Descripción", 
            walletAddress, 
            passwordHash 
        );
        
        await tx.wait();
        console.log("Usuario registrado:", walletAddress);
    } catch (error) {
        console.error("Error registering user:", error.message);
        console.error(error);
    }

    try {
        const isRegistered = await userRegistry.isUserRegistered(walletAddress);
        console.log("¿Está el usuario registrado?:", isRegistered);
    } catch (error) {
        console.error("Error checking registration status:", error);
    }
}

// Ejecutar el script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });