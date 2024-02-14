import daisyui_themes from "../assets/css/daisyui_themes";

export default function () {
    const theme = useState("theme", () => daisyui_themes.dark[0]);

    const changeTheme = (newTheme: string) => {
        if (daisyui_themes.dark.includes(newTheme) || daisyui_themes.light.includes(newTheme)) theme.value = newTheme;
    };

    return { theme, list_themes: daisyui_themes, changeTheme };
}
