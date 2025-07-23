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
        has_dropdown: false,
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
    },
    {
        id: 4,
        page: "nav_1",
        has_dropdown: false,
        title: "SmartSentinels HUB",
        link: "/hub",
        target: "_blank",
    },
];
export default menu_data;
