import "../scss/footer.scss";
import "../index.css";
const Footer = () => {
  return (
    <footer className="site-footer robo">
      <div className="container-info">
        <div className="cont-part-1">
          <h6>About</h6>
          <p className="text-justify">
            This project is a feature-rich blogging platform designed to empower
            users to create, edit, and share their thoughts through engaging
            blog posts. Built with a modern tech stack, including Gin (Go),
            React, and Supabase, the application provides a seamless experience
            for users to express themselves while enjoying a secure and
            user-friendly interface. <br />
            <br />
            The platform focuses on delivering core features such as user
            authentication, blog content creation, and robust content storage.
            With a clean and responsive user interface, users can easily
            register, log in, and manage their blogs. The backend ensures
            efficient handling of user data and blog content, leveraging the
            power of Supabase for authentication and database management. <br />
            <br />
            This project is ideal for casual users looking to share their
            stories or developers interested in exploring full-stack development
            with a modern toolkit. It serves as a great example of integrating a
            secure backend with a dynamic frontend, creating a cohesive and
            scalable web application for blogging enthusiasts.
          </p>
        </div>

        <div className="cont-part-2">
          <h6>Categories</h6>
          <ul className="footer-links">
            <li>
              <a href="https://react.dev/learn">React</a>
            </li>
            <li>
              <a href="https://go.dev/learn/">Go</a>
            </li>
            <li>
              <a href="https://docs.docker.com/get-started/">Docker</a>
            </li>
            <li>
              <a href="https://supabase.com/">SupaBase</a>
            </li>
            <li>
              <a href="https://gin-gonic.com/docs/">Gin</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="copyright">
        <p className="copyright-text">
          Copyright &copy; 2024 All Rights Reserved by{" "}
          <a href="https://itish2003io-itish-srivastavas-projects.vercel.app/">
            {" "}
            Itish Srivastava
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
