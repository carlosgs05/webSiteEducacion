import HeaderHome from '../../components/HeaderHome'
import Footer from '../../components/Footer'
import InfoMediaSection from '../../components/InfoMediaSection'

const Home = () => {
    return (
        <>
            <HeaderHome />

            <InfoMediaSection
                title="Presentación"
                content="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                "
                media="https://www.youtube.com/embed/2pqfLDEoVK4?si=5QaHOZTKUvFfIPkl"
                mediaType="video"
                mediaPosition="right"
            />

            <Footer />
        </>
    )
}

export default Home
