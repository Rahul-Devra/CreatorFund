import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">About CrowdLaunch</h1>

      <section className="mb-8">
        <p className="mb-4">
          Welcome to CrowdLaunch, a platform dedicated to supporting creators
          and innovators by enabling seamless fundraising and donations. Whether
          you&apos;re an artist, writer, musician, developer, or any other type of
          creator, CrowdLaunch provides the tools you need to connect with your
          audience and receive the support you deserve.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Our Mission</h2>
        <p>
          At CrowdLaunch, our mission is to empower creators by providing a
          user-friendly platform for monetizing their talents and projects. We
          believe that creativity should be rewarded, and our goal is to make it
          easy for supporters to fund the creators they love.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">How It Works</h2>
        <div className=" flex flex-col md:flex-row">
          <ol className="list-decimal ml-6">
            <li className="mb-2">
              <strong className="text-violet-700">Create Your Profile:</strong>
              <ul className="list-disc ml-6">
                <li>
                  Sign up and create a personalized profile to showcase your
                  work and projects.
                </li>
                <li>
                  Add details about your work, including images, videos, and
                  descriptions to attract supporters.
                </li>
              </ul>
            </li>
            <li className="mb-2">
              <strong className="text-violet-700">Set Up Payment:</strong>
              <ul className="list-disc ml-6">
                <li>
                  Integrate your payment account securely through our platform.
                </li>
                <li>
                  CrowdLaunch supports various payment methods to ensure your
                  supporters can contribute easily.
                </li>
              </ul>
            </li>
            <li className="mb-2">
              <strong className="text-violet-700">Receive Support:</strong>
              <ul className="list-disc ml-6">
                <li>
                  Supporters can make one-time or recurring donations to your
                  projects.
                </li>
                <li>
                  Track your earnings and manage your funds directly through our
                  platform.
                </li>
              </ul>
            </li>
          </ol>
          <div
            className="w-full md:w-auto m-auto h-[210px] border-4 border-blue-900"
            style={{
              borderImage:
                "linear-gradient(to right bottom, rgb(79, 70, 229) 0%, rgb(165, 56, 164) 50%, rgb(220, 38, 38) 100%)",
              borderImageSlice: 1,
            }}
          >
            <video
              autoPlay
              muted
              loop
              controls
              className="w-full h-[200px] p-1 "
            >
              <source src="/Video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Why CrowdLaunch?</h2>
        <ul className="list-disc ml-6">
          <li className="mb-2">
            <strong className="text-violet-700">Secure and Reliable:</strong> We prioritize the security of
            your financial transactions and personal information. Our platform
            uses industry-standard encryption and secure payment gateways to
            protect your data.
          </li>
          <li className="mb-2">
            <strong className="text-violet-700">User-Friendly Interface:</strong> Our intuitive design makes
            it easy for creators and supporters to navigate the platform, create
            profiles, and make donations.
          </li>
          <li className="mb-2">
            <strong className="text-violet-700">Community Focused:</strong> CrowdLaunch is built with a
            focus on community. We strive to foster a supportive environment
            where creators can connect with their audience and grow their
            projects.
          </li>
          <li className="mb-2">
            <strong className="text-violet-700">Transparent Fees:</strong> We believe in transparency. Our
            fee structure is straightforward, with no hidden charges, so you
            know exactly how much you’re earning.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Join Our Community</h2>
        <p>
          CrowdLaunch is more than just a fundraising platform; it&apos;s a community
          of passionate creators and generous supporters. Join us today and be a
          part of a movement that celebrates and supports creativity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Contact Us</h2>
        <p>
          Have questions or need assistance? Our support team is here to help!
          Contact us at
          <a
            href="mailto:support@fundrisenow.com"
            className="text-blue-600 underline"
          >
            support@fundrisenow.com
          </a>
          or visit our
          <a href="#" className="text-blue-600 underline">
            Help Center
          </a>
          for more information.
        </p>
        <p>
          Thank you for choosing CrowdLaunch. Together, we can make great things
          happen!
        </p>
      </section>
    </div>
  );
};

export default About;

export const metadata = {
  title: "About - CrowdLaunch!!!",
};
