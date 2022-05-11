import React, { createContext } from 'react'
import { auth, db } from '../Config/Config'

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {

        let userId = '';

        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUpUsersData').doc(user.uid).get().then(user => {
                    // userId = snapshot?.id
                    const prevProducts = []//this.state.products;
                    db.collection('Products').orderBy('rating', 'desc').onSnapshot(snapshot => {
                        let changes = snapshot.docChanges();
                        changes.forEach(change => {
                            if (change.type === 'added' && change.doc.data().userId !== user?.id) {
                                prevProducts.push({
                                    ProductID: change.doc.id,
                                    ProductName: change.doc.data().ProductName,
                                    ProductPrice: change.doc.data().ProductPrice,
                                    ProductImg: change.doc.data().ProductImg,
                                    rating: change.doc.data().rating,
                                    users: change.doc.data().users,
                                    totalRate: change.doc.data().totalRate,
                                })
                            }
                            this.setState({
                                products: prevProducts
                            })
                        })
                    })
                })
            }
        })

    }
    render() {
        return (
            <ProductsContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}

