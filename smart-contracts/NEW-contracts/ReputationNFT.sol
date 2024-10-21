// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReputationNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCount;
    string[3] public backgrounds = [
        "background1.png",
        "background2.png",
        "background3.png"
    ];

    constructor() ERC721("ReputationNFT", "RNFT") {}

    // Mints a new NFT
    function mint(address _user) external onlyOwner {
        tokenCount++;
        uint256 newTokenId = tokenCount;
        string memory metadataURI = generateMetadata(newTokenId);
        _safeMint(_user, newTokenId);
        _setTokenURI(newTokenId, metadataURI);
    }

    // Generates metadata for the NFT
    function generateMetadata(uint256 _tokenId) internal view returns (string memory) {
        uint256 bgIndex = _tokenId % 3;
        return string(abi.encodePacked("https://api.opensea.io/api/v1/assets/", backgrounds[bgIndex]));
    }

    // Assigns reliability score to the NFT
    function assignReliabilityScore(uint256 _tokenId, uint8 _score) external onlyOwner {
        require(_score >= 1 && _score <= 3, "Score must be between 1 and 3");
        // Update the token's metadata with the new score
    }
}
