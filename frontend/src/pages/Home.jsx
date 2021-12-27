import Categories from '../componets/Categories';
import Slider from "../componets/Slider";
import Products from '../componets/Products';
import Announcement from './../componets/Announcement';
import NewsLetter from '../componets/NewsLetter';

const Home = () => {
    return (
        <>
            <Announcement />
            <Slider />
            <Categories />
            <Products limit={ 6 } />
            <NewsLetter />
        </>
    )
}

export default Home
