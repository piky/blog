import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Tech Wizard',
    Svg: require('@site/static/img/tech-wizard.svg').default,
    description: (
      <>
        Neither oversized tools nor over-engineered techniques. Just bring your wand — I’m here to light your way.
      </>
    ),
  },
  {
    title: 'Best-effort Delivery',
    Svg: require('@site/static/img/mission_to_the_moon.svg').default,
    description: (
      <>
        Lift your ideas to the moon and back — fast, high-quality, iterative, and on time. Every feedback matters.
      </>
    ),
  },
  {
    title: 'Professional Service',
    Svg: require('@site/static/img/crafty-penguin.svg').default,
    description: (
      <>
        Savings often come with ABSOLUTELY NO WARRANTY. Lock profits down by minimizing resolution time.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
