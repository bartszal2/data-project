import OptionCard from "../../components/HomePage/OptionCard";
import "../../styles/pages/HomePage.scss";

function HomePage() {
  return (
    <main className="homepage-main">
      <div className="homepage-main__banner">
        <div className="banner__title">Lorem ipsum dolor sit</div>
        <div className="banner__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi non sit
          suscipit, quis ipsum vel at, natus necessitatibus ut et, ipsam in
          repellendus. Illo dolore cum excepturi eos nostrum. Ad, amet. Magni
          aspernatur dolore consequuntur sit culpa ipsum atque repellat soluta,
          pariatur necessitatibus magnam adipisci repudiandae dicta explicabo
          rem delectus quibusdam animi impedit recusandae, libero vel! Pariatur
          voluptates illo explicabo. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Tempore amet possimus harum velit. Sequi nisi culpa
          dolor voluptatem, accusamus quod in blanditiis maxime at quisquam eos
          incidunt beatae doloremque explicabo?
        </div>
      </div>
      <div className="homepage-main__container">
        <OptionCard
          linkPath="albums"
          cardTitle="Albums List Page"
          cardText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, repellendus nihil qui ad in aliquam."
        />
        <OptionCard
          linkPath="albums/1"
          cardTitle="Album ID 1 Page"
          cardText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo,
          repellendus nihil qui ad in aliquam."
        />
        <OptionCard
          linkPath="photo/1"
          cardTitle="Photo ID 1 Page"
          cardText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, repellendus nihil qui ad in aliquam."
        />
        <OptionCard
          linkPath="posts"
          cardTitle="Posts List Page"
          cardText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, repellendus nihil qui ad in aliquam."
        />
        <OptionCard
          linkPath="posts/1"
          cardTitle="Post ID 1 Page"
          cardText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, repellendus nihil qui ad in aliquam."
        />
        <OptionCard
          linkPath="users"
          cardTitle="Users List Page"
          cardText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, repellendus nihil qui ad in aliquam."
        />
        <OptionCard
          linkPath="users/1"
          cardTitle="User ID 1 Page"
          cardText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, repellendus nihil qui ad in aliquam."
        />
        <OptionCard
          linkPath="errorpage-lorem"
          cardTitle="Error Page"
          cardText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, repellendus nihil qui ad in aliquam."
        />
      </div>
    </main>
  );
}

export default HomePage;
