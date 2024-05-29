import React from "react";
import ImageSlider from "../components/imageSlider";
import Explore from "./Explore";
function Home() {
  const slides = [
    { url: "https://scontent.fcai21-4.fna.fbcdn.net/v/t39.30808-6/358044132_156366007455497_3242839822281835011_n.png?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=FFOjUg_MwsIQ7kNvgEFUYQk&_nc_ht=scontent.fcai21-4.fna&oh=00_AYCrp3xi4XREAi4kR-I5I8WZV9SoL2sHiZkoRoAC0e57Hg&oe=665C4226", title: "vegan" },
    { url: "https://scontent.fcai21-4.fna.fbcdn.net/v/t39.30808-6/355080622_145497505209014_391731537621748820_n.png?stp=dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3o3K3_J3G-4Q7kNvgGVO0wo&_nc_ht=scontent.fcai21-4.fna&oh=00_AYBJ_AZsSrgeD01vqf7U2BJn5rTPpfq30ZIwNnSiOQnBIw&oe=665C50EC", title: "meat" },
    { url: "https://scontent.fcai21-4.fna.fbcdn.net/v/t39.30808-6/345600532_923392515444799_4878078500584057230_n.png?stp=dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=mOuzic6any8Q7kNvgFXdenA&_nc_ht=scontent.fcai21-4.fna&oh=00_AYA9rUyjit0_6WXXVUj36PVwdZ7cr0IJMsIAdTKfEeaK_w&oe=665C358D", title: "tacos" },
    { url: "https://scontent.fcai21-4.fna.fbcdn.net/v/t39.30808-6/441508099_358144730610956_7681398235958702152_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CXwDpM-xKvAQ7kNvgHRDvUk&_nc_ht=scontent.fcai21-4.fna&oh=00_AYB_hFlMUY7M9892J96GuHv5o8D5d_5Lz5VVg8JcQ8VCQA&oe=665C43A6", title: "r" },
    { url: "https://scontent.fcai21-4.fna.fbcdn.net/v/t39.30808-6/441459052_17901288215988241_4422445209577513607_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=zB9BnKAr3aQQ7kNvgE9Hw2v&_nc_ht=scontent.fcai21-4.fna&oh=00_AYCjj2sP80pdIrfzJSrXty4I3dPSCTYaN3LBVNc-Rehd7Q&oe=665C3A39", title: "fancy" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden sm:overflow-x-auto">
      <div className="mb-10">
        <ImageSlider id="first" slides={slides}></ImageSlider>
      </div>
      <div className="mt-5 mb-2">
        <Explore />
      </div>
    </div>
  );
}

export default Home;
