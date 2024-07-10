export const listAllCoins = async () => {
    try {
        const coinsListResponse = await fetch("https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=CG-naDXp9qnDvFt9HUJfzRvJSds");
        const coinsList = await coinsListResponse.json();
        if (!coinsListResponse.ok) {
            const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
            throw new Error(errorMessage);
        }
        return coinsList;
    } catch (error) {
        return error;
    }
}