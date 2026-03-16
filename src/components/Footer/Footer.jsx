function Footer() {
    return (
        <div className="flex flex-col items-center border-t-2 border-[#2C2C2C]">
            <div className="flex w-4/5 justify-between pt-5 text-center">
                <div className="flex flex-col items-center justify-end pl-5">
                    <p className="mb-5 font-bold underline underline-offset-2">SOCIALS</p>
                    <p className="mt-2.5 p-0">
                        <a
                            target="_blank"
                            href="https://www.instagram.com/_man.av/"
                            className="m-0 p-0 text-[#aaa] no-underline hover:text-[#d2cdcd]"
                        >
                            Insta
                        </a>
                    </p>
                    <p className="mt-2.5 p-0">
                        <a
                            target="_blank"
                            href="https://www.linkedin.com/in/manav-gusain/"
                            className="m-0 p-0 text-[#aaa] no-underline hover:text-[#d2cdcd]"
                        >
                            Linked In
                        </a>
                    </p>
                    <p className="mt-2.5 p-0">
                        <a
                            target="_blank"
                            href="https://x.com/Manav437"
                            className="m-0 p-0 text-[#aaa] no-underline hover:text-[#d2cdcd]"
                        >
                            X(Formely Twitter)
                        </a>
                    </p>
                    <p className="mt-2.5 p-0">
                        <a
                            target="_blank"
                            href="https://in.pinterest.com/elite_like_that/"
                            className="m-0 p-0 text-[#aaa] no-underline hover:text-[#d2cdcd]"
                        >
                            Pinterest
                        </a>
                    </p>
                </div>

                <div className="flex flex-col">
                    <p className="mb-5 font-bold underline underline-offset-2">ABOUT</p>
                    <p className="mt-2.5 p-0">
                        <a href="" className="m-0 p-0 text-[#aaa] no-underline hover:text-[#d2cdcd]">Our story</a>
                    </p>
                    <p className="mt-2.5 p-0">
                        <a href="" className="m-0 p-0 text-[#aaa] no-underline hover:text-[#d2cdcd]">Terms & Conditions</a>
                    </p>
                    <p className="mt-2.5 p-0">
                        <a href="" className="m-0 p-0 text-[#aaa] no-underline hover:text-[#d2cdcd]">Privacy Policy</a>
                    </p>
                    <p className="mt-2.5 p-0">
                        <a href="" className="m-0 p-0 text-[#aaa] no-underline hover:text-[#d2cdcd]">Cookie Policy</a>
                    </p>
                </div>

                <div className="flex flex-col items-center pr-5">
                    <p className="mb-5 font-bold underline underline-offset-2">HELP</p>
                    <p className="mt-2.5 p-0">
                        <a href="" className="m-0 p-0 text-[#aaa] no-underline hover:text-[#d2cdcd]">FAQs</a>
                    </p>
                    <p className="mt-2.5 p-0">
                        <a href="" className="m-0 p-0 text-[#aaa] no-underline hover:text-[#d2cdcd]">Contact</a>
                    </p>
                </div>
            </div>

            <div className="mx-5 my-5 flex h-[70px] w-[95%] items-center overflow-hidden whitespace-nowrap border-t-2 border-[#2C2C2C] pt-5">
                <div className="flex animate-[scroll_20s_linear_infinite] flex-row items-center transition-transform duration-500 ease-out hover:[animation-play-state:paused]">
                    <h1 className="h1-one mx-5 inline-block text-[35px] leading-none">CHATTERINO</h1>
                    <h1 className="h1-two mx-5 inline-block text-[35px] leading-none">CHATTERINO</h1>
                    <h1 className="h1-three mx-5 inline-block text-[35px] leading-none">CHATTERINO</h1>
                    <h1 className="h1-four mx-5 inline-block text-[35px] leading-none">CHATTERINO</h1>
                    <h1 className="h1-five mx-5 inline-block text-[35px] leading-none">CHATTERINO</h1>
                    <h1 className="h1-one mx-5 inline-block text-[35px] leading-none">CHATTERINO</h1>
                    <h1 className="h1-two mx-5 inline-block text-[35px] leading-none">CHATTERINO</h1>
                    <h1 className="h1-three mx-5 inline-block text-[35px] leading-none">CHATTERINO</h1>
                    <h1 className="h1-four mx-5 inline-block text-[35px] leading-none">CHATTERINO</h1>
                    <h1 className="h1-five mx-5 inline-block text-[35px] leading-none">CHATTERINO</h1>
                </div>
            </div>
        </div>
    );
}

export default Footer;