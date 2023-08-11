export default function () {
    const theme = useState('theme', () => 'light');

    const changeTheme = (data) => {
        theme.value = data;
    }

    return { theme, changeTheme };
}