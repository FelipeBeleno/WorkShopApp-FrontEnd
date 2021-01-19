import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, } from '@material-ui/core'

export const Cards = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card style={{ maxWidth: 345, maxHeight: 280 }}>
                        <CardActionArea>
                            <CardMedia
                                style={{
                                    height: 140
                                }}
                                image="https://cdn.pixabay.com/photo/2013/10/01/02/18/wheel-188959__340.jpg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography>
                                    Occaecat elit ipsum aute reprehenderit cillum nulla mollit consectetur incididunt consectetur do. Dolor quis elit quis non cupidatat. Labore incididunt et consequat aliquip officia nostrud esse aliquip sunt fugiat commodo. Labore exercitation veniam minim eu veniam laborum in. Culpa reprehenderit cupidatat laborum non officia fugiat incididunt dolore enim Lorem.
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>
                <Grid item xs={12} md={4}>
                    <Card style={{ maxWidth: 345, maxHeight: 280 }}>
                        <CardActionArea>
                            <CardMedia
                                style={{
                                    height: 140
                                }}
                                image="https://c.pxhere.com/photos/f1/0f/account_bank_business_buy_card_cards_cash_commerce-1160020.jpg!d"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography>
                                    Occaecat elit ipsum aute reprehenderit cillum nulla mollit consectetur incididunt consectetur do. Dolor quis elit quis non cupidatat. Labore incididunt et consequat aliquip officia nostrud esse aliquip sunt fugiat commodo. Labore exercitation veniam minim eu veniam laborum in. Culpa reprehenderit cupidatat laborum non officia fugiat incididunt dolore enim Lorem.
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>
                <Grid item xs={12} md={4}>
                    <Card style={{ maxWidth: 345, maxHeight: 280 }}>
                        <CardActionArea>
                            <CardMedia
                                style={{
                                    height: 140
                                }}
                                image="https://c.pxhere.com/photos/b9/bd/tool_tools_equipment_work_handmade_manual_home_diy-1201707.jpg!d"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography>
                                    Occaecat elit ipsum aute reprehenderit cillum nulla mollit consectetur incididunt consectetur do. Dolor quis elit quis non cupidatat. Labore incididunt et consequat aliquip officia nostrud esse aliquip sunt fugiat commodo. Labore exercitation veniam minim eu veniam laborum in. Culpa reprehenderit cupidatat laborum non officia fugiat incididunt dolore enim Lorem.
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

            </Grid>

        </div>
    )
}
