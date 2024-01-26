const techStack = [];

if (!techStack.includes("AI")) {
  console.log("You risk being left behind.");
  setTimeout(() => {
    console.log("Start learning AI.");
    techStack.push("AI");
    console.log(techStack);
  }, 3000);
}
