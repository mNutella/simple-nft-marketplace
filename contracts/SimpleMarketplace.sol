// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

import "./SimpleNFT.sol";

contract SimpleMarketplace is
    Ownable,
    ReentrancyGuard,
    IERC721Receiver,
    IERC1155Receiver
{
    using Counters for Counters.Counter;
    Counters.Counter private _items;
    Counters.Counter private _soldItems;

    using ERC165Checker for address;

    address payable private _owner;
    uint256 private constant _listingPrice = 0.0007 ether;

    mapping(uint256 => MarketplaceItem) private _idToMarketplaceItem;
    mapping(string => bool) private _marketplaceItemUrls;

    struct MarketplaceItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        string uri;
    }

    event MarketplaceItemChanged(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    SimpleNFT private _simpleNFT;

    constructor(address simpeNFT_) {
        _owner = payable(msg.sender);
        setSimpleNFTAddress(simpeNFT_);
    }

    // sets new simpleNFT contract address
    function setSimpleNFTAddress(address simpeNFT) public onlyOwner {
        _simpleNFT = SimpleNFT(simpeNFT);
    }

    // returns the listing price of the contract
    function getListingPrice() external pure returns (uint256) {
        return _listingPrice;
    }

    // mints an nft and places for sale on marketplace
    function createMarketplaceNFT(string memory uri, uint256 price)
        external
        payable
    {
        // TEMPRORARY // upgrade erc721 to erc1155 OR deploy diff users' collection into diff erc721 contracts (old behaviour - check commits)
        uint256 createdTokenId = _simpleNFT.safeMint(address(this), uri);
        createMarketplaceItem(address(_simpleNFT), createdTokenId, price);
    }

    // places an item for sale on the marketplace
    function createMarketplaceItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == _listingPrice,
            "Price must be equal to Listing Price"
        );
        require(
            nftContract.supportsInterface(type(IERC165).interfaceId),
            "Contract must implement IERC165"
        );

        string memory uri;
        if (nftContract.supportsInterface(type(IERC1155).interfaceId)) {
            uri = IERC1155MetadataURI(nftContract).uri(tokenId);

            if (IERC1155(nftContract).balanceOf(address(this), tokenId) == 0) {
                IERC1155(nftContract).safeTransferFrom(
                    msg.sender,
                    address(this),
                    tokenId,
                    1,
                    ""
                );
            }
        } else if (nftContract.supportsInterface(type(IERC721).interfaceId)) {
            uri = IERC721Metadata(nftContract).tokenURI(tokenId);

            if (IERC721(nftContract).ownerOf(tokenId) != address(this)) {
                IERC721(nftContract).transferFrom(
                    msg.sender,
                    address(this),
                    tokenId
                );
            }
        } else revert("NFT does not implement IERC721 or IERC1155");

        if (_marketplaceItemUrls[uri])
            revert("NFT is already added to marketplace");

        _items.increment();
        uint256 itemId = _items.current();

        _idToMarketplaceItem[itemId] = MarketplaceItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false,
            uri
        );
        _marketplaceItemUrls[uri] = true;

        payable(_owner).transfer(_listingPrice);

        emit MarketplaceItemChanged(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    // creates the sale of a marketplace item
    function createMarketplaceSale(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = _idToMarketplaceItem[itemId].price;
        uint256 tokenId = _idToMarketplaceItem[itemId].tokenId;

        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        require(
            msg.sender != _idToMarketplaceItem[itemId].seller,
            "You are the seller of this item"
        );

        _idToMarketplaceItem[itemId].seller.transfer(msg.value);

        if (nftContract.supportsInterface(type(IERC1155).interfaceId)) {
            IERC1155(nftContract).safeTransferFrom(
                address(this),
                msg.sender,
                tokenId,
                1,
                ""
            );
        } else if (nftContract.supportsInterface(type(IERC721).interfaceId)) {
            IERC721(nftContract).transferFrom(
                address(this),
                msg.sender,
                tokenId
            );
        }

        _idToMarketplaceItem[itemId].owner = payable(msg.sender);
        _idToMarketplaceItem[itemId].sold = true;
        _marketplaceItemUrls[_idToMarketplaceItem[itemId].uri] = false;

        _soldItems.increment();

        emit MarketplaceItemChanged(
            itemId,
            nftContract,
            tokenId,
            address(this),
            msg.sender,
            price,
            true
        );
    }

    // returns all unsold marketplace items
    function fetchMarketplaceItems()
        external
        view
        returns (MarketplaceItem[] memory)
    {
        uint256 itemCount = _items.current();
        uint256 unsoldItemCount = _items.current() - _soldItems.current();
        uint256 currentIndex = 0;

        MarketplaceItem[] memory items = new MarketplaceItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (_idToMarketplaceItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketplaceItem storage currentItem = _idToMarketplaceItem[
                    currentId
                ];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    // returns the item by id
    function fetchMarketplaceItem(uint256 itemId)
        external
        view
        returns (MarketplaceItem memory)
    {
        MarketplaceItem memory item = _idToMarketplaceItem[itemId];
        if (item.itemId == itemId) return item;
        revert("Item not found");
    }

    // returns only items that a user has purchased
    function fetchMyNFTs() external view returns (MarketplaceItem[] memory) {
        uint256 totalItemCount = _items.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (_idToMarketplaceItem[i + 1].owner == msg.sender) {
                itemCount++;
            }
        }

        MarketplaceItem[] memory items = new MarketplaceItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (_idToMarketplaceItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketplaceItem storage currentItem = _idToMarketplaceItem[
                    currentId
                ];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    // returns only items a user has created
    function fetchItemsCreated()
        external
        view
        returns (MarketplaceItem[] memory)
    {
        uint256 totalItemCount = _items.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (_idToMarketplaceItem[i + 1].seller == msg.sender) {
                itemCount++;
            }
        }

        MarketplaceItem[] memory items = new MarketplaceItem[](itemCount);

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (_idToMarketplaceItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketplaceItem storage currentItem = _idToMarketplaceItem[
                    currentId
                ];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return
            bytes4(
                keccak256(
                    "onERC1155Received(address,address,uint256,uint256,bytes)"
                )
            );
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] calldata,
        uint256[] calldata,
        bytes calldata
    ) external pure override returns (bytes4) {
        return
            bytes4(
                keccak256(
                    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"
                )
            );
    }

    function supportsInterface(bytes4 interfaceId)
        public
        pure
        override
        returns (bool)
    {
        return
            interfaceId == type(IERC721Receiver).interfaceId ||
            interfaceId == type(IERC1155Receiver).interfaceId;
    }
}
