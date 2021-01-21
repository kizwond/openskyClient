import React, { Component } from 'react';
import { Card } from 'antd';

class FinishStudy extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <>
            <div style={{width:'920px', margin:"auto", marginTop:"5%"}}>
                <div style={{textAlign:"center", marginBottom:"5px", fontSize:"14px"}}>학습이 종료되었습니다!!!</div>
                <div style={{textAlign:"center", marginBottom:"20px", fontSize:"14px"}}>수고하셨습니다!!!</div>
                <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between", width:'100%', marginBottom:"10px"}}>
                    <Card title="오늘 학습한 카드 수" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="오늘 얻은 경험치" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="학습이 가장 오래걸린 카드 상위 10개" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
                <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between", width:'100%', marginBottom:"10px"}}>
                    <Card title="카드당 평균 학습 시간" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="목표시간 달성 여부" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="동일책을 구매한 다른 사용자의 학습성과" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
                <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between", width:'100%'}}>
                    <Card title="이책을 공부한 사람들이 어떠한 책을 다음에 공부하였는지" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="이책의 분야(카테고리)에서 다른 유명한 책들 리스트" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="종합평가(AI스럽게...다음엔 이부분에 좀더 집중해보시는건 어떨까요?)" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>내가 가진 전채 책을 기반으로 학습이 저조한 분야에 대해 목표를 설정해주는 블라블라</p>
                        <p>분석데이터등등.....</p>
                        <p>Card content</p>
                    </Card>
                </div>
            </div>     
            </>
          );
    }
}
 
export default FinishStudy;