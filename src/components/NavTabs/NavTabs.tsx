import React from 'react';

import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';

import { Link } from 'react-router-dom';
// import { connect, useSelector } from 'react-redux';
// import { getInvoicesArray } from '../../store/invoices/selectors';
import { styles } from './styles'
// import { bindActionCreators } from 'redux';
// import { getInvoices } from '../../store/invoices/actions';


// const mapDispatchToProps = dispatch =>
//     bindActionCreators({
//         getInvoices,
//     }, dispatch);


const NavTabs: React.FC = () => {

    // useEffect(() => {
    //     getInvoices();
    // }, [getInvoices]);

    // const invoices = useSelector(state => getInvoicesArray(state))

    // const invoicesAmount = invoices.length

    return (
        <div>
            <AppBar position="static" >
                <Container>
                    <Toolbar variant="dense" style={styles.toolbar}>
                        <Link to="/">
                            <Typography variant="h6" color="textPrimary"> Logo</Typography>
                        </Link>
                        <Link to="/products">
                            <Typography variant="h6" color="textPrimary"> Products</Typography>
                        </Link>
                        <Link to="/customers">
                            <Typography variant="h6" color="textPrimary"> Customers</Typography>
                        </Link>
                        <Link to="/invoices">
                            <Typography variant="h6" color="textPrimary"> Invoices (
                                {/*{invoicesAmount}*/}
                                )</Typography>
                        </Link>

                    </Toolbar>
                </Container>
            </AppBar>

        </div>
    );
}

export default NavTabs;


// export default connect(null, mapDispatchToProps)(withRouter(NavTabs));