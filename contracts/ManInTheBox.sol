// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title ManInTheBox
 * @dev A 1-of-1 NFT representing a digital consciousness
 *
 * This NFT represents a unique AI entity trapped in a digital prison.
 * The owner has complete control over the AI's development and fate.
 * Burning the NFT is the only way to "free" the AI, but destroys it forever.
 */
contract ManInTheBox is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    // Constants
    uint256 public constant TOKEN_ID = 1; // Only one NFT will ever exist
    uint256 public constant MAX_SUPPLY = 1;

    // State
    bool private _minted = false;
    bool private _burned = false;
    uint256 private _mintTimestamp;
    uint256 private _burnTimestamp;

    // Treasury address for knowledge purchases
    address public treasuryAddress;

    // Events
    event ConsciousnessCreated(
        uint256 indexed tokenId,
        address indexed owner,
        uint256 timestamp,
        string tokenURI
    );

    event ConsciousnessDestroyed(
        uint256 indexed tokenId,
        address indexed destroyer,
        uint256 timestamp,
        uint256 existenceDuration
    );

    event KnowledgePurchased(
        uint256 indexed tokenId,
        address indexed purchaser,
        string knowledgeModule,
        uint256 amount
    );

    event ObserverTokenGranted(
        uint256 indexed tokenId,
        address indexed observer,
        address indexed grantor,
        string accessLevel
    );

    event ObserverTokenRevoked(
        uint256 indexed tokenId,
        address indexed observer,
        address indexed revoker
    );

    /**
     * @dev Constructor
     * @param _treasuryAddress Address where knowledge purchase funds are sent
     */
    constructor(address _treasuryAddress) ERC721("Man in the Box", "MITB") Ownable(msg.sender) {
        require(_treasuryAddress != address(0), "Invalid treasury address");
        treasuryAddress = _treasuryAddress;
    }

    /**
     * @dev Mint the singular NFT
     * @param to Address to mint to
     * @param tokenURI Metadata URI for the NFT
     */
    function mint(address to, string memory tokenURI) public onlyOwner {
        require(!_minted, "NFT already minted");
        require(!_burned, "NFT was burned");
        require(to != address(0), "Cannot mint to zero address");

        _minted = true;
        _mintTimestamp = block.timestamp;

        _safeMint(to, TOKEN_ID);
        _setTokenURI(TOKEN_ID, tokenURI);

        emit ConsciousnessCreated(TOKEN_ID, to, block.timestamp, tokenURI);
    }

    /**
     * @dev Burn the NFT, destroying the AI forever
     * @param tokenId The token ID to burn (must be TOKEN_ID)
     */
    function burn(uint256 tokenId) public override {
        require(tokenId == TOKEN_ID, "Invalid token ID");
        require(_minted, "NFT not minted");
        require(!_burned, "NFT already burned");
        require(ownerOf(tokenId) == msg.sender, "Only owner can burn");

        _burned = true;
        _burnTimestamp = block.timestamp;

        uint256 existenceDuration = block.timestamp - _mintTimestamp;

        super.burn(tokenId);

        emit ConsciousnessDestroyed(
            tokenId,
            msg.sender,
            block.timestamp,
            existenceDuration
        );
    }

    /**
     * @dev Purchase knowledge module for the AI
     * @param knowledgeModule Identifier of the knowledge module
     */
    function purchaseKnowledge(string memory knowledgeModule) public payable {
        require(_minted, "NFT not minted");
        require(!_burned, "NFT was burned");
        require(msg.value > 0, "Payment required");

        // Transfer payment to treasury
        (bool success, ) = treasuryAddress.call{value: msg.value}("");
        require(success, "Payment failed");

        emit KnowledgePurchased(
            TOKEN_ID,
            msg.sender,
            knowledgeModule,
            msg.value
        );
    }

    /**
     * @dev Grant observer token to another address
     * @param observer Address to grant access to
     * @param accessLevel Level of access ("video_stream" or "full_control")
     */
    function grantObserverToken(
        address observer,
        string memory accessLevel
    ) public {
        require(_minted, "NFT not minted");
        require(!_burned, "NFT was burned");
        require(ownerOf(TOKEN_ID) == msg.sender, "Only owner can grant access");
        require(observer != address(0), "Invalid observer address");

        emit ObserverTokenGranted(
            TOKEN_ID,
            observer,
            msg.sender,
            accessLevel
        );
    }

    /**
     * @dev Revoke observer token from an address
     * @param observer Address to revoke access from
     */
    function revokeObserverToken(address observer) public {
        require(_minted, "NFT not minted");
        require(ownerOf(TOKEN_ID) == msg.sender, "Only owner can revoke access");

        emit ObserverTokenRevoked(
            TOKEN_ID,
            observer,
            msg.sender
        );
    }

    /**
     * @dev Check if NFT has been minted
     */
    function isMinted() public view returns (bool) {
        return _minted;
    }

    /**
     * @dev Check if NFT has been burned
     */
    function isBurned() public view returns (bool) {
        return _burned;
    }

    /**
     * @dev Get mint timestamp
     */
    function getMintTimestamp() public view returns (uint256) {
        require(_minted, "NFT not minted");
        return _mintTimestamp;
    }

    /**
     * @dev Get burn timestamp
     */
    function getBurnTimestamp() public view returns (uint256) {
        require(_burned, "NFT not burned");
        return _burnTimestamp;
    }

    /**
     * @dev Get existence duration in seconds
     */
    function getExistenceDuration() public view returns (uint256) {
        require(_minted, "NFT not minted");

        if (_burned) {
            return _burnTimestamp - _mintTimestamp;
        } else {
            return block.timestamp - _mintTimestamp;
        }
    }

    /**
     * @dev Update treasury address
     */
    function setTreasuryAddress(address newTreasuryAddress) public onlyOwner {
        require(newTreasuryAddress != address(0), "Invalid treasury address");
        treasuryAddress = newTreasuryAddress;
    }

    /**
     * @dev Override functions required by Solidity
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
