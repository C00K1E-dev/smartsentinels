interface MenuItem {
    id: number;
    page: string;
    title: string;
    link: string;
    has_dropdown: boolean;
    target?: string;
    sub_menus?: {
        link: string;
        title: string;
    }[];
}

const menu_data: MenuItem[] = [
    {
        id: 1,
        page: "nav_1",
        has_dropdown: true,
        title: "Home",
        link: "/#home",
    },
    {
        id: 2,
        page: "nav_1",
        has_dropdown: false,
        title: "Feature",
        link: "/#feature",
    },
    {
        id: 3,
        page: "nav_1",
        has_dropdown: false,
        title: "RoadMap",
        link: "/#roadMap",
        target: "_blank",
    },
    {
        id: 4,
        page: "nav_1",
        has_dropdown: false,
        title: "SmartSentinels HUB",
        link: "/hub",
        target: "_blank",
    },
    
    {
        id: 1,
        page:"nav_2",
        has_dropdown: true,
        title: "Home",
        link: "#",
        sub_menus: [
            { link: "/", title: "ICO Investment" },
            { link: "/home-two", title: "Blockchain", },
        ],
    },
    {
        id: 2,
        page:"nav_2",
        has_dropdown: false,
        title: "Why Blockchain",
        link: "/home-two/#blockchain",
    },
    {
        id: 3,
        page:"nav_2",
        has_dropdown: false,
        title: "Feature",
        link: "/home-two/#feature",
    },
    {
        id: 4,
        page:"nav_2",
        has_dropdown: true,
        title: "Blog",
        link: "#",
        sub_menus: [
            { link: "/blog", title: "Our Blog" },
            { link: "/blog-details", title: "Blog-Details", },
        ],
    },
    {
        id: 5,
        page:"nav_2",
        has_dropdown: false,
        title: "Contact",
        link: "/contact",
    },
];
export default menu_data;
