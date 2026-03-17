import { Button } from './ui/Button'
import { FadeInItem } from './ui/FadeIn'
import { Layout } from 'antd'
import { Link } from 'react-router-dom'
import { MotionDiv } from './ui/MotionComponents'

const ErrorPage = () => {
    return (
        <Layout className="flex flex-col items-center justify-center gap-4 md:gap-6 px-2 h-screen bg-bg-base font-body text-text-primary">
            <MotionDiv
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                    duration: 0.5,
                    delay: 0.2,
                    ease: [0.25, 0.25, 0, 1]
                }}
                className="flex flex-col items-center"
            >
                <h1 className='text-[120px] md:text-[180px] font-black leading-none tracking-widest text-(--brand-primary)'>
                    404
                </h1>
                <p className='-mt-4 z-10 text-center tracking-widest text-base md:text-lg uppercase font-bold opacity-80'>
                    lost in the deck.
                </p>
            </MotionDiv>
            <FadeInItem>
                <p className='text-(--text-muted) italic font-normal leading-relaxed text-center tracking-wide text-base md:text-lg max-w-md'>
                    the log you are looking for has been rotated or doesn't exist...
                </p>
            </FadeInItem>
            <Link to="/">
                <Button size="lg" className="mt-4">
                    return to reality
                </Button>
            </Link>
        </Layout>
    )
}

export default ErrorPage