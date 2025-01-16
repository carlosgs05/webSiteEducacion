import HeaderHome from "../../components/HeaderHome";
import Footer from "../../components/Footer";
import InfoMediaSection from "../../components/InfoMediaSection";
import CardSlider from "../../components/CardSlider";

const Home = () => {
    const data = [
        {
            image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
            date: '16/01/2025',
            link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
        },
        {
            image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
            date: '16/01/2025',
            link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
        },
        {
            image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
            date: '16/01/2025',
            link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
        },
        {
            image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
            date: '16/01/2025',
            link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
        },
        {
            image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
            date: '16/01/2025',
            link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
        },
        {
            image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
            date: '16/01/2025',
            link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
        }
    ]
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
            <section className="bg-[url('../src/assets/fondoSection.png')] h-auto bg-cover bg-center bg-no-repeat w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-24 py-12">
                    <div>
                        <h2 className="font-bold text-xl text-[#262D73]">Mision</h2>
                        <p className="text-white text-base pt-3">
                            Lorem ipsum dolor sit amet consectetur adipiscing, elit feugiat
                            vivamus fringilla ultricies, nec per dignissim nullam aliquam.
                            Cras faucibus sociosqu placerat euismod urna tempor integer
                            nascetur metus nunc mattis duis viverra, accumsan est in curae dui
                            vehicula hendrerit ut senectus facilisis tortor. Purus posuere
                            urna tristique nibh sem proin quam habitant suscipit, a libero
                            vehicula lacus fusce vivamus arcu.
                        </p>
                    </div>
                    <div>
                        <h2 className="font-bold text-xl text-[#262D73]">Vision</h2>
                        <p className="text-white text-base pt-3">
                            Lorem ipsum dolor sit amet consectetur adipiscing, elit feugiat
                            vivamus fringilla ultricies, nec per dignissim nullam aliquam.
                            Cras faucibus sociosqu placerat euismod urna tempor integer
                            nascetur metus nunc mattis duis viverra, accumsan est in curae dui
                            vehicula hendrerit ut senectus facilisis tortor. Purus posuere
                            urna tristique nibh sem proin quam habitant suscipit, a libero
                            vehicula lacus fusce vivamus arcu.
                        </p>
                    </div>
                </div>
            </section>

            <CardSlider
                title="Noticias"
                data={data}
            />

            <Footer />
        </>
    );
};

export default Home;
