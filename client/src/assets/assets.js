import logo from './logo.png'
import userProfile from './userProfile.png'
import recipe1 from './recipe 1.png'
import recipe2 from './recipe 2.png'
import recipe3 from './recipe 3.png'
import latest1 from './latest 1.png'
import latest2 from './latest 2.png'
import latest3 from './latest 3.png'
import latest4 from './latest 4.png'


export const assets = {
    logo,
    userProfile
}

export const featured = [
    {
        id: 1,
        title: 'Creamy Tomato Pasta',
        Ingredients: 'A simple and delicious pasta recipe.',
        image: recipe1,
    },
    {
        id: 2,
        title: 'Fresh Summer Salad',
        Ingredients: 'Light and refreshing salad for hot days.',
        image: recipe2,
    },
    {
        id: 3,
        title: 'Chocolate Lava Cake',
        Ingredients: 'Indulgent chocolate dessert.',
        image: recipe3,
    },
]

export const latest = [
    {
        id: 1,
        title: 'Spicy Chicken Tacos',
        Ingredients:'Delicious tacos with a kick, perfect for a weeknight dinner.',
        image: latest1,
    },
    {
        id: 2,
        title: 'Vegan Lentil Soup',
        Ingredients: 'Hearty and healthy soup, packed with lentils and vegetables.',
        image: latest2,
    },
    {
        id: 3,
        title: 'Baked Salmon with Asparagus',
        Ingredients: 'Easy and flavorful salmon recipe, ready in under 30 minutes.',
        image: latest3,
    },
    {
        id: 4,
        title: 'Fruit Smoothie Bowl',
        Ingredients: 'A refreshing and nutritious breakfast or snack option.',
        image: latest4,
    }
]