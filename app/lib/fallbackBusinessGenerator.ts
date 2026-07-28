import type { BusinessDirection } from "../types/business";

function createDirection(
  id: string,
  title: string,
  customer: string,
  valueCreated: string,
  credibility: string,
  testability: string,
): BusinessDirection {
  return {
    id,
    title,
    customer,
    valueCreated,
    credibility,
    testability,
  };
}

export function generateFallbackBusinessDirections(
  skills: string,
): BusinessDirection[] {
  const normalized = skills.toLowerCase();

  if (
    normalized.includes("software") ||
    normalized.includes("developer") ||
    normalized.includes("programming") ||
    normalized.includes("code")
  ) {
    return [
      createDirection(
        "workflow-automation",
        "Workflow automation for small businesses",
        "Small businesses and independent professionals managing repetitive work manually.",
        "Reduce time spent on recurring administrative tasks with simple, focused digital tools.",
        `Your experience with ${skills} gives you the technical foundation to identify and automate practical workflows.`,
        "You can start with one process review and build a small solution for a single repetitive task.",
      ),
      createDirection(
        "internal-tools",
        "Simple internal tools for specialist teams",
        "Small operational teams that rely on spreadsheets, email and disconnected tools.",
        "Create lightweight internal systems that make information easier to track and decisions easier to make.",
        `Your ${skills} background can help you translate an operational problem into a usable internal tool.`,
        "You can interview one team, prototype one workflow and test it before building a larger product.",
      ),
      createDirection(
        "technical-advisory",
        "Technical guidance for non-technical founders",
        "Early-stage founders who need to make software decisions without hiring a full technical team.",
        "Help them define a practical first version, avoid unnecessary complexity and choose the right next technical step.",
        `Your experience in ${skills} gives you useful judgment that non-technical founders may not have internally.`,
        "You can test the direction through a fixed-scope technical review or planning session.",
      ),
    ];
  }

  if (
    normalized.includes("teach") ||
    normalized.includes("teacher") ||
    normalized.includes("training") ||
    normalized.includes("education")
  ) {
    return [
      createDirection(
        "outcome-coaching",
        "Outcome-based learning sessions",
        "Students or professionals who need help achieving one specific learning result.",
        "Replace generic information with a focused path, direct feedback and practical support.",
        `Your experience with ${skills} gives you subject knowledge and the ability to guide someone through a learning process.`,
        "You can test one paid session around a narrowly defined outcome before creating a larger program.",
      ),
      createDirection(
        "team-training",
        "Practical training for small teams",
        "Small companies that need their teams to adopt a skill or process quickly.",
        "Create short, applied training that helps employees perform a real task more confidently.",
        `Your ${skills} background can be converted into structured exercises, examples and feedback for a team.`,
        "You can validate the direction with one workshop for a local company or professional group.",
      ),
      createDirection(
        "learning-materials",
        "Specialized learning resources",
        "People who repeatedly struggle with the same topic and need a clearer practical resource.",
        "Turn complex knowledge into concise guides, exercises or templates that make progress easier.",
        `Your experience in ${skills} helps you recognize common misunderstandings and explain them clearly.`,
        "You can first share or sell one small resource and observe whether people use it and ask for more.",
      ),
    ];
  }

  if (
    normalized.includes("cook") ||
    normalized.includes("cooking") ||
    normalized.includes("baking") ||
    normalized.includes("chef") ||
    normalized.includes("food")
  ) {
    return [
      createDirection(
        "small-group-experiences",
        "Small-group cooking experiences",
        "People who want a social, practical and memorable food experience.",
        "Help them learn a specific dish or technique while enjoying a guided experience.",
        `Your experience with ${skills} gives you a credible skill that can be demonstrated and taught directly.`,
        "You can test one limited-seat session without investing in a permanent venue or large operation.",
      ),
      createDirection(
        "specialty-food-service",
        "Focused specialty food service",
        "Busy local customers looking for one distinctive, reliable homemade food option.",
        "Provide a high-quality food product for a specific occasion, preference or recurring need.",
        `Your ${skills} capability can support a narrow menu built around what you already make particularly well.`,
        "You can test pre-orders for one product before expanding the menu or production capacity.",
      ),
      createDirection(
        "kitchen-guidance",
        "Personal kitchen guidance",
        "People who want to cook better but feel blocked by planning, confidence or technique.",
        "Help them build a practical routine around meals they can realistically prepare themselves.",
        `Your experience in ${skills} lets you diagnose practical problems and demonstrate solutions in context.`,
        "You can validate it through one in-home or remote kitchen review with a clearly defined result.",
      ),
    ];
  }

  if (
    normalized.includes("design") ||
    normalized.includes("photo") ||
    normalized.includes("photography") ||
    normalized.includes("video") ||
    normalized.includes("creative")
  ) {
    return [
      createDirection(
        "visual-launch-package",
        "Visual launch packages for independent professionals",
        "Independent professionals who need a credible visual presence for a new offer or service.",
        "Give them a small, coherent set of visual assets they can use immediately.",
        `Your experience with ${skills} gives you the ability to turn an unclear message into a more polished visual presentation.`,
        "You can test a fixed-scope package with one professional before developing a broader creative service.",
      ),
      createDirection(
        "content-production",
        "Recurring content production for small businesses",
        "Small businesses that need consistent visual content but cannot maintain an internal creative team.",
        "Help them publish useful, recognizable content on a predictable schedule.",
        `Your ${skills} capability can be packaged into a repeatable monthly production process.`,
        "You can test one short content cycle with a single business and measure whether the assets are actually used.",
      ),
      createDirection(
        "visual-audit",
        "Visual communication audits",
        "Small organizations whose website or social presence does not communicate their value clearly.",
        "Identify the highest-impact visual and messaging improvements before they invest in a full redesign.",
        `Your experience in ${skills} gives you a trained perspective that customers may not have internally.`,
        "You can begin with a paid audit and recommendations, without committing to a complete redesign.",
      ),
    ];
  }

  return [
    createDirection(
      "specialist-service",
      "A focused specialist service",
      "People or small businesses that need a result connected to your experience.",
      "Help one specific type of customer achieve a useful outcome faster, more clearly or with less risk.",
      `Your experience with ${skills} gives you a starting point that can be shaped into a narrow service.`,
      "You can test it by offering one clearly defined result to a real person before building anything larger.",
    ),
    createDirection(
      "advisory-session",
      "A practical advisory session",
      "People facing a decision or problem that your knowledge can help them navigate.",
      "Provide clarity, diagnosis and a concrete next-step plan around one specific challenge.",
      `Your background in ${skills} may give you useful judgment that others would value in a focused conversation.`,
      "You can test demand with a single paid or pilot session and observe whether the outcome is valuable.",
    ),
    createDirection(
      "repeatable-resource",
      "A repeatable resource or toolkit",
      "People who repeatedly face a problem that can be made easier with a guide, template or practical system.",
      "Turn part of your knowledge into a reusable resource that helps customers act independently.",
      `Your experience with ${skills} can help you organize a process that others currently approach inconsistently.`,
      "You can create and test one small resource before investing in a larger product or platform.",
    ),
  ];
}
