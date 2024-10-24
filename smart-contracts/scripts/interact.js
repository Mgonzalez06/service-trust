const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x8E67154c0566e09422B226d190C073bBd0737046"; 
    const UserRegistry = await ethers.getContractFactory("UserRegistry");
    const userRegistry = UserRegistry.attach(contractAddress);

    // Parámetros para la prueba
    const name = "Jonathan";
    const surname = "Gamboa";
    const country = "Costa Rica";
    const city = "San José";
    const nationality = "Costarricense"
    const birthdate = 1234567890; 
    const email = "jongamboa@example.com"; 
    const passwordHash = "passsword123"; 
    const phone = "88332244";
    const walletAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"; 

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