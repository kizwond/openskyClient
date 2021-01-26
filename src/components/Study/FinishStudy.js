import React, { Component } from 'react';
import { Card } from 'antd';
import axios from 'axios'

class FinishStudy extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            exp_gained_session:0,
            exp_gained_card_count:0,
         }
    }

    componentDidMount(){
        // const exp_gained_session = sessionStorage.getItem('exp_gained')
        // const exp_gained_card_count = sessionStorage.getItem('exp_gained_card_count')
        // this.setState({
        //     exp_gained_session: exp_gained_session,
        //     exp_gained_card_count: exp_gained_card_count
        // })
        const sessionId = sessionStorage.getItem('sessionId')
        axios.post('api/studyresult/req-session-studyresult',{
            session_id:sessionId
        }).then(res => {
            console.log("서버로부터 통계정보 :",res.data)
            this.setState({
                result:res.data.session.study_result
            })
        })

    }


    render() { 
        console.log(this.state.result)
        if(this.state.result){
            var num_cards_change_flip = this.state.result.flip.studied_cards
            var total_flip_studied = num_cards_change_flip.total

            var num_cards_change_read = this.state.result.read.studied_cards
            var total_read_studied = num_cards_change_read.total

            var total_study_hour = this.state.result.total.study_hour
            console.log(total_study_hour)
            var total_min = total_study_hour/60000
            console.log(total_min)
        } else {
            total_flip_studied = 0
            total_read_studied = 0
            total_min = 0

        }
        
        return (
            <>
            {this.state.result ? <div style={{width:'920px', margin:"auto", marginTop:"5%"}}>
                <div style={{textAlign:"center", marginBottom:"5px", fontSize:"14px"}}>학습이 종료되었습니다!!!</div>
                <div style={{textAlign:"center", marginBottom:"20px", fontSize:"14px"}}>수고하셨습니다!!!</div>
                <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between", width:'100%', marginBottom:"10px"}}>
                    <Card title="오늘 학습한 카드 수" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>읽기카드 : {total_read_studied} </p>
                        <p>뒤집기카드 : {total_flip_studied} </p>
                        <p>세션학습시간 : {total_min}</p>
                    </Card>
                    <Card title="오늘 얻은 경험치" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        {/* <span>총 <span style={{color:"blue", fontWeight:"700", fontSize:'15px'}}>{this.state.exp_gained_card_count}</span>장의 카드에서</span>
                        <span><span style={{color:"blue", fontWeight:"700", fontSize:'15px'}}>{this.state.exp_gained_session}</span>점의 경험치를 획득하셨습니다.</span> */}
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
                        <p>멘토가 되어줄 책들도 막 추천해주고.</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="종합평가(AI스럽게...다음엔 이부분에 좀더 집중해보시는건 어떨까요?)" extra={<a href="#">More</a>} style={{ width: 300 }}>
                        <p>내가 가진 전채 책을 기반으로 학습이 저조한 분야에 대해 목표를 설정해주는 블라블라</p>
                        <p>분석데이터등등.....</p>
                        <p>Card content</p>
                    </Card>
                </div>
            </div>    :'hello' }
            
            </>
          );
    }
}
 
export default FinishStudy;