export const listAllCoins = async () => {
    try {
        const coinsListResponse = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&x_cg_demo_api_key=${process.env.API_KEY}`);
        const coinsList = await coinsListResponse.json();
        if (!coinsListResponse.ok) {
            const errorMessage = `${coinsListResponse.status} ${coinsListResponse.statusText} ${coinsList.message}`;
            throw new Error(errorMessage);
        }
        return coinsList;
    } catch (error) {
        return error;
    }
};