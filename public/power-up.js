/* global TrelloPowerUp */

const VIEW_API = 'https://batforce.netlify.app/.netlify/functions/webhook-handler';

const CAPABILITY_BOARD_BADGE = 'board-buttons';
const CAPABILITY_CARD_BADGE = 'card-badges';

// Initialize the Trello Power-Up client
const t = TrelloPowerUp.iframe();

// Helper function to fetch view counts from your Netlify function
async function getViewCount(id, type) {
    const response = await fetch(`${VIEW_API}?id=${id}&type=${type}`);
    const data = await response.json();
    return data.count;
}

// Board button to display view count
const boardButtonCallback = async (t, opts) => {
    const boardId = t.getContext().board;
    const count = await getViewCount(boardId, 'board');
    return t.popup({
        title: `Board Views: ${count}`,
        items: []
    });
};

// Card badges to display view counts
const cardBadges = async (t, opts) => {
    const cardId = t.getContext().card;
    const count = await getViewCount(cardId, 'card');
    return [
        {
            text: `Views: ${count}`,
            color: 'green',
            refresh: 10 // seconds
        }
    ];
};

// Register capabilities with Trello
TrelloPowerUp.initialize({
    [CAPABILITY_BOARD_BADGE]: () => [{
        icon: 'https://batforce.org.au/wp-content/uploads/BAT.png',
        text: 'Views',
        callback: boardButtonCallback,
    }],
    [CAPABILITY_CARD_BADGE]: cardBadges,
});
