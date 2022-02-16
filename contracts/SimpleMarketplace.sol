// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./SimpleNFT.sol";
import "./Console.sol";

contract SimpleMarketplace is ReentrancyGuard, Console {
    using Counters for Counters.Counter;
    Counters.Counter private _items;
    Counters.Counter private _soldItems;

    address payable private _owner;
    uint256 private constant _listingPrice = 0.025 ether;

    mapping(uint256 => MarketplaceItem) private _idToMarketplaceItem;

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

    event MarketplaceItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() {
        _owner = payable(msg.sender);
    }

    // returns the listing price of the contract
    function getListingPrice() external pure returns (uint256) {
        return _listingPrice;
    }

    // creates an nft and places for sale on marketplace
    function createMarketplaceNFT(
        string memory name,
        string memory symbol,
        string memory uri,
        uint256 price
    ) external payable {
        SimpleNFT newNft = new SimpleNFT(name, symbol);
        newNft.safeMint(msg.sender, uri);

        newNft.grantRole(newNft.MINTER_ROLE(), msg.sender);
        newNft.grantRole(newNft.DEFAULT_ADMIN_ROLE(), msg.sender);

        newNft.approve(address(this), 0);
        createMarketplaceItem(address(newNft), 0, price);
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
            "Price must be equal to listing price"
        );

        _items.increment();
        uint256 itemId = _items.current();

        string memory uri = IERC721Metadata(nftContract).tokenURI(tokenId);
        _idToMarketplaceItem[itemId] = MarketplaceItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false,
            uri
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        payable(_owner).transfer(_listingPrice);

        emit MarketplaceItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    // creates the sale of a marketplace item
    // transfers ownership of the item, as well as funds between parties
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

        _idToMarketplaceItem[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        _idToMarketplaceItem[itemId].owner = payable(msg.sender);
        _idToMarketplaceItem[itemId].sold = true;

        _soldItems.increment();
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
            if (_idToMarketplaceItem[i + 1].owner == address(0)) {
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
}
