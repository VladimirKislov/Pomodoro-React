import React from 'react';
import style from './layout.css';

interface ILayoutProps {
    children?: React.ReactNode;
}

export function Layout ({ children }: ILayoutProps) {
    return (
        <div className={style.layout}>
            { children }
        </div>
    )
}