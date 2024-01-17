import { render } from "@react-email/render";
import WelcomeTemplate from "../../../emails";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request, res: Response) {
	// rate limit
	// authorization

	const { email, userFirstname } = await request.json();

	const { data, error } = await resend.emails.send({
		from: "Acme <noreply@your_domain.com>",
		to: [email],
		subject: "Thank you",
		html: render(WelcomeTemplate({ userFirstname })),
	});

	if (error) {
		return Response.json(error);
	}

	return Response.json({ message: "Email sent successfully" });
}
