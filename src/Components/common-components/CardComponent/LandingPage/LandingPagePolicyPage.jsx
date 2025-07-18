import React from 'react'

function LandingPagePolicyPage() {
    return (
        <div className="container my-5">
            <h1 className="mb-4 text-center">Terms and Conditions</h1>

            <section className="mb-5">
                <h4>1. Introduction</h4>
                <p>
                    Welcome to our platform. These Terms and Conditions govern your use of our website and services. By accessing or using the site, you agree to be bound by these terms. If you do not agree with any part, please do not use our services.
                </p>
            </section>

            <section className="mb-5">
                <h4>2. User Responsibilities</h4>
                <p>
                    You must use the website lawfully and must not engage in any activity that is harmful to the site or its users. You are solely responsible for any content you post or share.
                </p>
            </section>

            <section className="mb-5">
                <h4>3. Intellectual Property</h4>
                <p>
                    All content on this site, including logos, text, graphics, images, and software, is the property of the company or its licensors and is protected by copyright and trademark laws.
                </p>
            </section>

            <section className="mb-5">
                <h4>4. Privacy Policy</h4>
                <p>
                    Your privacy is important to us. Please read our Privacy Policy to understand how we collect, use, and protect your information.
                </p>
            </section>

            <section className="mb-5">
                <h4>5. Modifications</h4>
                <p>
                    We reserve the right to change or modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the site after changes means you accept the updated terms.
                </p>
            </section>

            <section className="mb-5">
                <h4>6. Termination</h4>
                <p>
                    We may suspend or terminate your access to the website if you violate these terms or engage in conduct we deem inappropriate or harmful.
                </p>
            </section>

            <section className="mb-5">
                <h4>7. Limitation of Liability</h4>
                <p>
                    We are not liable for any direct, indirect, incidental, or consequential damages arising out of your use or inability to use the site or services.
                </p>
            </section>

            <section className="mb-5">
                <h4>8. Governing Law</h4>
                <p>
                    These terms shall be governed by and construed in accordance with the laws of your jurisdiction. Any disputes shall be resolved in local courts.
                </p>
            </section>

            <section className="mb-5">
                <h4>9. Contact Us</h4>
                <p>
                    If you have any questions about these Terms and Conditions, you can contact us at:
                    <br /><strong>Email:</strong> support@yourcompany.com
                    <br /><strong>Phone:</strong> +91 9876543210
                </p>
            </section>

            <hr />

            <footer className="text-center mt-5">
                <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
            </footer>
        </div>
    )
}

export default LandingPagePolicyPage
