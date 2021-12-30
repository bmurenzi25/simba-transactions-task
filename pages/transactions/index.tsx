import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Header from '../../components/header';
import Image from 'next/image'

function index() {
    const [data, setData] = useState([]);
    const [userId, setuserId] = useState(-1);
    const [account, setAccount] = useState('')

    useEffect(() => {
        const id = localStorage.getItem('id');
        setuserId(Number(id))
        const acc_id = localStorage.getItem('account_no');
        const getAccountData = async (acc_id: number) => {
            const account = await axios.get(`/api/accounts/${acc_id}`);
            setAccount(account.data.data)
        }
        const getTransactions = async (id: number) => {
            const transactions = await axios.get(`/api/transactions/${id}`);
            setData(transactions.data.data);
        }
        getAccountData(Number(acc_id));
        getTransactions(Number(id));
    }, []);
    return (
        <>
            <Header />
            <div className='flex flex-col gap-8 p-24'>
                <div className='flex flex-row gap-24 space-around'>
                    <div className='flex gap-4'>
                        <Image src={'/usd.jpeg'} width={60} height={60} />
                        <div className='flex flex-col justify-around'>
                            <p className='font-bold'>USD BALANCE</p>
                            <p>{account.balanceUSD}</p>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <Image src={'/ngn.png'} width={60} height={60} />
                        <div className='flex flex-col justify-around'>
                            <p className='font-bold'>NGN BALANCE</p>
                            <p>{account.balanceNGN}</p>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <Image src={'/eur.png'} width={60} height={60} />
                        <div className='flex flex-col justify-around'>
                            <p className='font-bold'>EUR BALANCE</p>
                            <p>{account.balanceEUR}</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between content-end'>
                    <p>TRANSACTIONS</p>
                    <Link href="/transactions/create">
                        <a className='px-4 py-4 bg-blue-500 text-white font-bold'>NEW TRANSACTION</a>
                    </Link>
                </div>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>FROM</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>TO</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>VALUE</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>CURRENCY</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>CREATED AT</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>UPDATED AT</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {data.length && data.map((transaction) => (
                            <tr key={transaction['id']}>
                                <td className='px-6 py-4 whitespace-nowrap'>{transaction['id']}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{(transaction['senderId'] && transaction['senderId'] !== undefined) ? transaction['senderId'] === userId ? 'You' : transaction['sender']['name'] : null}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{transaction['receiverId'] === userId ? 'You' : transaction['receiver']['name']}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-green-500'>{transaction['receiverId'] === userId ? '+' : '-'} {transaction['amount']}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{transaction['sourceCurrency']}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{transaction['createdAt']}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{transaction['updatedAt']}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default index
