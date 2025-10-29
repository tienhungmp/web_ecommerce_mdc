import { IoPhonePortraitOutline, IoLaptopOutline, IoWatchOutline } from 'react-icons/io5';
import { TbDeviceAirpods, TbDeviceUsb } from 'react-icons/tb';
import { RiHomeGearFill } from 'react-icons/ri';
import { FaComputer } from 'react-icons/fa6';
import { SlScreenDesktop } from 'react-icons/sl';
import { GiCardExchange } from 'react-icons/gi';
import { BsPhoneFlip, BsNewspaper } from 'react-icons/bs';
import { AiOutlineNotification } from 'react-icons/ai';

export const links = [
  {
    text: 'Điện thoại',
    icon: IoPhonePortraitOutline,
    data: [
        {
            title: 'Thương hiệu điện thoại',
            subTitles: [
                'iPhone',
                'Samsung',
                'Xiaomi',
                'OPPO',
                'realme',
                'vivo',
                'Nokia',
                'ASUS',
                'Nubia',
                'TECHNO',
                'Infinix',
                'OnePlus',
                'Itel',
                'TCL',
                'Điện thoại phổ thông',
            ],
        },
        {
            title: 'Mức giá điện thoại',
            subTitles: [
                'Dưới 2 triệu',
                'Từ 2 - 4 triệu',
                'Từ 4 - 7 triệu',
                'Từ 7 - 13 triêu',
                'Từ 13 - 20 triệu',
                'Trên 20 triệu',
            ],
        },
        {
            title: 'Điện thoại hot',
            subTitles: [
                'iphone 15',
                'Galaxy ZFold 5',
                'Galaxy ZFlip 5',
                'Galaxy S23 Ultra',
                'Xiaomi 13T Pro',
                'realme C51',
                'TCL 408',
                'vivo Y17s',
                'Nubia Neo',
                'iPhone 15 Pro Max',
            ],
        },
        {
            title: 'Thương hiệu Tablet',
            subTitles: [
                'iPad',
                'Samsung',
                'Xiaomi',
                'Huawei',
                'Lenovo',
                'Nokia',
                'TCL',
                'Kindle',
                'Máy đọc sách',
                'Xem tất cả tablet',
            ],
        },
        {
            title: 'Tablet hot',
            subTitles: [
                'iPad Air 5',
                'iPad mini 6',
                'Galaxy Tab S9 FE 5G',
                'iPad Air 10.9" 2022 M1',
                'Nokia T21',
                'Huanwei MatePad SE 10.4',
                'TCL Tab 10L 3GB 32GB',
                'Xiaomi Pad SE',
            ],
        },
    ],
},
{
    text: 'Laptop',
    icon: IoLaptopOutline,
    data: [
        {
            title: 'Chọn theo hãng',
            subTitles: [
                'Mac',
                'Asus',
                'Lenovo',
                'Dell',
                'HP',
                'Acer',
                'LG',
                'Huawei',
                'MSI',
                'Gigabyte',
                'Vio',
                'Microsoft Surface',
            ],
        },
        {
            title: 'Chọn theo nhu cầu',
            subTitles: ['Văn phòng', 'Gaming', 'Mỏng nhẹ', 'Độ họa - Kỹ thuật', 'Sinh viên', 'Cảm ứng'],
        },
        {
            title: 'Chọn theo dòng chip',
            subTitles: ['Laptop Core i3', 'Laptop Core i5', 'Laptop Core i7', 'Laptop Core i9'],
        },
        {
            title: 'Chọn theo kích thước màn hình',
            subTitles: ['Laptop 12 inch', 'Laptop 13 inch', 'Laptop 14 inch', 'Laptop 15.6 inch', 'Laptop 16 inch'],
        },
        {
            title: 'Sản phẩm hot',
            subTitles: [
                'Macbook Pro M2 2022 512GB',
                'Macbook Pro 13 M2 2022 256GB',
                'Macbook Air M2 2022 512GB',
                'MSI Modern 14 C7M-212VN',
                'MSI Gaming GF64 Thin 664VN',
            ],
        },
    ],
},
{
    text: 'Âm thanh',
    icon: TbDeviceAirpods,
    data: [
        {
            title: 'Chọn loại tai nghe',
            subTitles: [
                'Tai nghe Bluetooth',
                'Tai nghe chụp tai',
                'Tai nghe có dây',
                'Tai nghe thể thao',
                'Tai nghe Gaming',
                'Xem tất cả tai nghe',
            ],
        },
        {
            title: 'Hãng tai nghe',
            subTitles: [
                'Apple',
                'JBL',
                'Xiaomi',
                'Samsung',
                'Sony',
                'Sennheiser',
                'Soundpeats',
                'Soul',
                'Havit',
                'Edifier',
            ],
        },
        {
            title: 'Chọn loại loa',
            subTitles: ['Loa bluetooth', 'Loa mini', 'Loa Karaoke', 'Loa Soundbar', 'Xem tất cả loa'],
        },
        {
            title: 'Hãng loa',
            subTitles: [
                'JBL',
                'LG',
                'Sony',
                'Marshall',
                'Harman Kardon',
                'Tronsmart',
                'Samsung',
                'Edifier',
                'Bose',
            ],
        },
        {
            title: 'Sản phẩm nổi bật',
            subTitles: [
                'AirPods Pro 2',
                'AirPods Pro 2021',
                'JBL Tour Pro 2',
                'Soul S-LIVE 30',
                'JBL TUNE 230 TWS',
                'Loa Sony SRS-XE200',
                'Edifier QD35',
            ],
        },
        {
            title: 'Mic',
            subTitles: ['Mic Karaoke', 'Mic thu âm'],
        },
    ],
},
{
    text: 'Đồng hồ',
    icon: IoWatchOutline,
    data: [
        {
            title: 'Loại đồng hồ',
            subTitles: ['Đồng hồ thông minh', 'Vòng đeo tay thông minh', 'Đồng hồ định vị trẻ em', 'Dây đeo'],
        },
        {
            title: 'Chọn theo thương hiệu ',
            subTitles: [
                'Apple Watch',
                'Samsung',
                'Xiaomi',
                'Huawei',
                'Coros',
                'Garmin',
                'Kieslect',
                'Amazfit',
                'Soundpeats',
            ],
        },
        {
            title: 'Sản Phẩm nổi bật',
            subTitles: [
                'Apple Watch Series 9',
                'Apple Watch Ultra 2 2023',
                'Huawei Watch GT4',
                'Samsung Galaxy Watch6',
                'Garmin Venu 3',
                'Xiaomi Band 8',
                'Huawei Watch Fit SE',
                'Apple Watch SE',
            ],
        },
        {
            title: 'Camera',
            subTitles: [
                'Camera an ninh',
                'Camera hành trình',
                'Action camera',
                'Gimbal',
                'Tripod',
                'Máy ảnh',
                'Flycam',
                'Xem tất cả máy ảnh',
            ],
        },
    ],
},
{
    text: 'Smarthome',
    icon: RiHomeGearFill,
    data: [
        {
            title: 'Gia dụng nhà bếp',
            subTitles: [
                'Nồi chiên không dầu',
                'Nồi cơm điện',
                'Lò vi sóng',
                'Bếp điện',
                'Máy ép trái cây',
                'Máy làm sữa hạt',
                'Ấm siêu tốc',
            ],
        },
        {
            title: 'Sức khỏe - Làm đẹp',
            subTitles: [
                'Máy lọc không khí',
                'Bàn ghế công thái học',
                'Bàn ghế gaming',
                'Máy sấy tóc',
                'Cân sức khoẻ',
                'Bàn chải điện',
                'Máy tăm nước',
            ],
        },
        {
            title: 'Thiết bị gia đình',
            subTitles: [
                'Robot hút bụi',
                'Máy hút bụi cầm tay',
                'Máy lọc nước',
                'TV Box',
                'Máy chiếu',
                'Quạt',
                'Đèn thông minh',
            ],
        },
        {
            title: 'Sản phẩm nổi bật⚡',
            subTitles: [
                'Ghế gaming WARRIOR WGC307 Plus💺',
                'Ghế gaming WARRIOR WGC203💺',
                'Robot hút bụi Dreame giảm tới 47% ☀️',
                'Robot hút bụi Roborock Q7 Max Plus ☀️',
                'Quạt đứng Kangaroo KG725 ☀️',
                'Nồi chiên không dầu SHARP KF-AF42MV-ST 4.2L ☀️',
            ],
        },
        {
            title: 'Chương trình nổi bật 💥',
            subTitles: ['Dreame Bot L20 Ultra - Phiếu mua quà 1tr 🌞', 'Ghế công thái học E-dra 🌞'],
        },
        {
            title: 'Thương hiệu gia dụng',
            subTitles: [
                'Kangaroo',
                'Philips',
                'Panasonic',
                'Sunhouse',
                'Sharp',
                'Cosori',
                'Bear',
                'Kalite',
                'Xiaomi',
                'Cuckoo',
            ],
        },
    ],
},
{
    text: 'Phụ kiện',
    icon: TbDeviceUsb,
    data: [
        {
            title: 'Phụ kiện di động',
            subTitles: [
                'Phụ kiện Apple',
                'Dán màn hình',
                'Ốp lưng - Bao da',
                'Thẻ nhớ',
                'Apple Care+',
                'Sim 4G',
                'Sim số đẹp',
                'Cáp, sạc',
                'Pin dự phòng',
                'Phụ kiện tiện ích',
            ],
        },
        {
            title: 'Phụ kiện Laptop',
            subTitles: [
                'Chuột, bàn phím',
                'Balo Laptop | Túi chống sốc',
                'Phần mềm',
                'Webcam',
                'Giá đỡ',
                'Thảm, lót chuột',
            ],
        },
        {
            title: 'Thiết bị mạng',
            subTitles: [
                'Thiết bị phát sóng WiFi',
                'Bộ phát wifi di động',
                'Bộ kích sóng WiFi',
                'Xem tất cả thiết bị mạng',
            ],
        },
        {
            title: 'Gaming Gear',
            subTitles: [
                'PlayStation',
                'ROG Ally',
                'Bàn phím Gaming',
                'Chuột chơi game',
                'Tai nghe Gaming',
                'Tay cầm chơi game',
                'Xem tất cả Gaming Gear',
            ],
        },
        {
            title: 'Phụ kiện khác',
            subTitles: [
                'Dây đeo đồng hồ',
                'Dây đeo Airtag',
                'Phụ kiện tiện ích',
                'Phụ kiện ô tô',
                'Đồ chơi trẻ em',
            ],
        },
        {
            title: 'Thiết bị lưu trữ',
            subTitles: ['Thẻ nhớ', 'USB', 'Ổ cứng di động'],
        },
        {
            title: 'Phụ kiện hot 🔥',
            subTitles: [
                'Ốp lưng iPhone 15',
                'Dán màn hình iPhone 15',
                'Cáp sạc iPhone 15',
                'Ốp lưng S23 Series',
                'Dán màn hình S23 Series',
            ],
        },
    ],
},
{
    text: 'PC',
    icon: FaComputer,
    data: [
        {
            title: 'Máy tính để bàn',
            subTitles: ['PC ráp sẵn CPS', 'Máy tính All In One', 'PC đồng bộ', 'Build PC'],
        },
        {
            title: 'Linh kiện máy tính',
            subTitles: ['CPU', 'Main', 'RAM', 'Ổ cứng', 'Nguồn', 'VGA', 'Tản nhiệt', 'Case', 'Xem tất cả'],
        },
        {
            title: 'Chọn màn hình theo hãng',
            subTitles: ['ASUS', 'Samsung', 'DELL', 'LG', 'MSI', 'GIGABYTE', 'HKC', 'ViewSonic', 'Philips', 'AOC'],
        },
        {
            title: 'Chọn màn hình theo nhu cầu',
            subTitles: ['Gaming', 'Văn phòng', 'Đồ họa', 'Màn hình di động', 'Arm màn hình', 'Xem tất cả'],
        },
        {
            title: 'Gaming Gear',
            subTitles: [
                'PlayStation',
                'ROG Ally',
                'Bàn phím Gaming',
                'Chuột chơi game',
                'Tai nghe Gaming',
                'Tay cầm chơi Game',
                'Xem tất cả',
            ],
        },
        {
            title: 'Thiết bị văn phòng',
            subTitles: ['Máy in', 'Phần mềm', 'Bàn, ghế công thái học'],
        },
    ],
},
{
    text: 'Tivi',
    icon: SlScreenDesktop,
    data: [
        {
            title: 'Chọn theo hãng',
            subTitles: ['Samsung', 'LG', 'Xiaomi', 'Coocaa', 'Toshiba', 'TCL'],
        },
        {
            title: 'Chọn theo mức giá',
            subTitles: ['Từ 9 - 12 triệu', 'Từ 12 - 15 ', 'Trên 15 triệu'],
        },
        {
            title: 'Chọn theo độ phân giải',
            subTitles: ['Tivi 4K', 'Tivi 8K', 'Tivi Full HD', 'Tivi QLED', 'Android Tivi'],
        },
        {
            title: 'Chọn theo kích thước',
            subTitles: [
                'Tivi 32 inch',
                'Tivi 43 inch',
                'Tivi 50 inch',
                'Tivi 55 inch',
                'Tivi 65 inch',
                'Tivi 70 inch',
                'Tivi 85 inch',
            ],
        },
        {
            title: 'Sản phẩm nổi bật ⚡',
            subTitles: [
                'Xiaomi TV Max 86 inch',
                'Tivi Xiaomi A Pro 55 inch 4K',
                'Tivi Toshiba 43 inch',
                'Tivi Coocaa 4K 70 inch 70Y72',
                'Tivi Khung Tranh 50 inch',
                'Tivi TCL 4K 43 inch 43P737',
                'Tivi TCL 4K 50 inch 50P737',
                'Smart Tivi LG 4K 65 inch 65UR7550PSC',
                'Khung treo tivi',
            ],
        },
    ],
},
{
    text: 'Thu cũ đổi mới',
    icon: GiCardExchange,
    data: [
        {
            title: 'Chọn theo hãng',
            subTitles: [
                'Thu cũ iPhone',
                'Thu cũ Samsung',
                'Thu cũ Mac',
                'Thu cũ Xiaomi',
                'Thu cũ Laptop',
                'Thu cũ iPad',
                'Thu cũ Apple Watch',
                'Thu cũ SKTel',
            ],
        },
        {
            title: 'Sản phẩm trợ giá cao⚡',
            subTitles: [
                'iPhone 14 Pro Max » 2 triệu',
                'Galaxy S23 Ultra » 2 triệu',
                'Samsung Galaxy Z Fold 5 » 2 triệu',
                'Samsung Galaxy Z Flip 5 » 2 triệu',
                'Samsung Galaxy Tab S9 » 2 triệu',
                'Macbook Air M1 » 2 triệu',
                'Macbook Air M2 » 2 triệu',
                'Macbook Pro M2 » 2 triệu',
                'Laptop » 3 triệu',
                'Máy chơi game Rog Ally » 2 triệu',
            ],
        },
        {
            title: 'Sản phẩm giá thu cao⚡',
            subTitles: [
                'iPhone 14 Pro Max',
                'iPhone 13 Pro Max',
                'iPhone 12 Pro Max',
                'iPhone 11 Pro Max',
                'Samsung Galaxy Z Fold 4',
                'Samsung Galaxy Z Flip 4',
                'Samsung Galaxy S23 Ultra',
                'Samsung Galaxy S22 Ultra',
                'Macbook Air M1',
                'Macbook Pro M1',
            ],
        },
    ],
},
{
    text: 'Hàng cũ',
    icon: BsPhoneFlip,
    data: [
        {
            title: 'Chọn loại sản phẩm cũ',
            subTitles: [
                'Điện thoại cũ',
                'Máy tính bảng cũ',
                'Mac cũ',
                'Laptop cũ',
                'Tai nghe cũ',
                'Loa cũ',
                'Đồng hồ thông minh cũ',
                'Nhà thông minh cũ',
                'Màn hình cũ',
                'Phụ kiện cũ',
            ],
        },
        {
            title: 'Chọn dòng iPhone cũ',
            subTitles: [
                'iPhone 14 series cũ',
                'iPhone 13 series cũ',
                'iPhone 12 series cũ',
                'iPhone 11 series cũ',
                'Xem tất cả iPhone cũ',
            ],
        },
        {
            title: 'Điện thoại Android cũ',
            subTitles: ['Samsung cũ', 'Xiaomi cũ', 'OPPO cũ', 'Nokia cũ', 'realme cũ', 'vivo cũ', 'ASUS cũ'],
        },
        {
            title: 'Chọn hãng laptop cũ',
            subTitles: ['Laptop Dell cũ', 'Laptop ASUS cũ', 'Laptop Acer cũ', 'Laptop HP cũ', 'Laptop Surface cũ'],
        },
        {
            title: 'Sản phẩm nổi bật ⚡',
            subTitles: [
                'iPhone 13 Series Cũ',
                'iPhone 12 Pro 256GB cũ đẹp',
                'iPhone 8 Plus 64GB cũ',
                'Apple Watch Series 6 cũ',
                'Macbook Air M1 đã kích hoạt',
                'Xiaomi 11T đã kích hoạt',
            ],
        },
        {
            title: 'Sản phẩm Apple cũ',
            subTitles: ['Apple Watch cũ', 'iPad cũ'],
        },
        {
            title: 'Chọn tivi cũ',
            subTitles: ['Tivi cũ'],
        },
    ],
},
{
    text: 'Khuyến mãi',
    icon: AiOutlineNotification,
    data: [
        {
            title: 'Khuyến mãi',
            subTitles: ['Hotsale cuối tuần', 'Ưu đãi thanh toán', 'Khách hàng doanh nghiệp B2B'],
        },
    ],
},
{
    text: 'Tin công nghệ',
    icon: BsNewspaper,
    data: [
        {
            title: 'Chuyên mục',
            subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
        },
    ],
},
  ];
  