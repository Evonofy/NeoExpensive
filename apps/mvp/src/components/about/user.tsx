import { FunctionComponent, memo } from 'react';
import { useQuery } from 'react-query';
import { z } from 'zod';

import { contributorValidator } from '@/pages/about';
import { blob } from '@/services/api';

import Github from '../../images/pages/about-us/github-logo.svg';

type UserProps = z.infer<typeof contributorValidator>;

const imageValidator = z.string();

const getContributorImage = (username: string) => {
  return useQuery([`contributor-${username}-image`], async () => {
    const pictureBlob = await blob(`/users/${username}.jpg`);

    const image = URL.createObjectURL(pictureBlob);

    return imageValidator.parse(image);
  });
};

const User: FunctionComponent<UserProps> = ({ username, name, role, github }) => {
  const { data: image, isLoading } = getContributorImage(username);

  return (
    <div key={name} className="aboutus--section--profile">
      {isLoading ? 'loading image...' : <img src={image} alt="" className="aboutus--section--profile--image" />}
      <p className="aboutus--section--profile--paragraph">{name}</p>
      <p className="aboutus--section--profile--function">{role}</p>

      <a data-reset href={`https://github.com/${github}`} className="aboutus--section--profile--link">
        <img src={Github} alt="Github Icon" className="aboutus--section--profile--link--image" />
      </a>
    </div>
  );
};

export default memo(User);
