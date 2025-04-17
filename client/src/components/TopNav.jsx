import { useAuth } from '../AuthContext';
import { useLocation } from 'react-router-dom';

const TopNav = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes('/accounting')) return 'Dịch vụ kế toán';
        if (path.includes('/audit')) return 'Dịch vụ kiểm toán';
        if (path.includes('/budget')) return 'Dịch vụ quản lý ngân sách';
        if (path.includes('/investment')) return 'Dịch vụ quản lý đầu tư';
        return 'Tổng quan';
    };

    return (
        <div className="top-nav">
            <strong>{getPageTitle()}</strong>
            <button onClick={logout}>Đăng xuất</button>
        </div>
    );
};

export default TopNav;
