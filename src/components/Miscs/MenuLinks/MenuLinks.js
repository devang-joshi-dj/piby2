import React from 'react';
import Flip from 'react-reveal/Flip';

const MenuLinkList = [
    {
        index: '1',
        href: '',
        linkName: 'Home',
    },
    {
        index: '2',
        href: '',
        linkName: 'About',
    },
    {
        index: '3',
        href: '',
        linkName: 'Services',
    },
    {
        index: '4',
        href: '',
        linkName: 'Contact',
    },
];

const MenuLinks = (props) => {
    return (
        <>
            {MenuLinkList.map(link => (
                <MenuLink
                    key={link.index}
                    href={link.link}
                    linkName={link.linkName}
                    {...props}
                />
            ))}
        </>
    );
}

const MenuLink = (props) => {
    return (
        <>
            <li>
                <a
                    href={props.link}
                    onClick={() => props.setShowMediaIcons(!props.showMediaIcons)}
                >
                    <Flip left cascade>
                        {props.linkName}
                    </Flip>
                </a>
            </li>
        </>
    );
}

export default MenuLinks;