export default function AboutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Hi, I&apos;m Aashish. I&apos;m a software developer passionate about building beautiful and functional web
          applications.
        </p>
        <p>
          This is where you can share more about yourself, your background, skills, interests, and anything else
          you&apos;d like visitors to know.
        </p>
        <h2>My Skills</h2>
        <ul>
          <li>JavaScript/TypeScript</li>
          <li>React & Next.js</li>
          <li>Node.js</li>
          <li>HTML/CSS</li>
          <li>UI/UX Design</li>
        </ul>
        <h2>My Journey</h2>
        <p>
          Share your journey as a developer, your education, work experience, and what led you to where you are today.
        </p>
      </div>
    </div>
  )
}

